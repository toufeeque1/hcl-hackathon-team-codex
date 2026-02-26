package com.retail.service.impl;

import com.retail.dto.CartDTO;
import com.retail.entity.Cart;
import com.retail.entity.CartItem;
import com.retail.entity.Product;
import com.retail.entity.User;
import com.retail.exception.ResourceNotFoundException;
import com.retail.repository.CartRepository;
import com.retail.repository.ProductRepository;
import com.retail.repository.UserRepository;
import com.retail.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Override
    public CartDTO.CartResponse getCart(String email) {
        User user = getUser(email);
        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> createCart(user));
        return toCartResponse(cart);
    }

    @Override
    @Transactional
    public CartDTO.CartResponse addItemToCart(String email, CartDTO.AddItemRequest request) {
        User user = getUser(email);
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product", request.getProductId()));

        Cart cart = cartRepository.findByUser(user)
                .orElseGet(() -> createCart(user));

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(request.getProductId()))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + request.getQuantity());
        } else {
            CartItem newItem = CartItem.builder()
                    .product(product)
                    .quantity(request.getQuantity())
                    .cart(cart)
                    .build();
            cart.getItems().add(newItem);
        }

        return toCartResponse(cartRepository.save(cart));
    }

    @Override
    @Transactional
    public CartDTO.CartResponse updateCartItem(String email, Long cartItemId, CartDTO.UpdateItemRequest request) {
        User user = getUser(email);
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user: " + email));

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getId().equals(cartItemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("CartItem", cartItemId));

        item.setQuantity(request.getQuantity());
        return toCartResponse(cartRepository.save(cart));
    }

    @Override
    @Transactional
    public CartDTO.CartResponse removeItemFromCart(String email, Long cartItemId) {
        User user = getUser(email);
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user: " + email));

        boolean removed = cart.getItems().removeIf(i -> i.getId().equals(cartItemId));
        if (!removed) {
            throw new ResourceNotFoundException("CartItem", cartItemId);
        }

        return toCartResponse(cartRepository.save(cart));
    }

    @Override
    @Transactional
    public void clearCart(String email) {
        User user = getUser(email);
        Cart cart = cartRepository.findByUser(user).orElse(null);
        if (cart != null) {
            cart.getItems().clear();
            cartRepository.save(cart);
        }
    }

    private Cart createCart(User user) {
        Cart cart = Cart.builder().user(user).build();
        return cartRepository.save(cart);
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    private CartDTO.CartResponse toCartResponse(Cart cart) {
        List<CartDTO.CartItemResponse> items = cart.getItems().stream()
                .map(this::toCartItemResponse)
                .collect(Collectors.toList());

        BigDecimal total = items.stream()
                .map(CartDTO.CartItemResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        CartDTO.CartResponse response = new CartDTO.CartResponse();
        response.setCartId(cart.getId());
        response.setItems(items);
        response.setTotalAmount(total);
        return response;
    }

    private CartDTO.CartItemResponse toCartItemResponse(CartItem item) {
        CartDTO.CartItemResponse response = new CartDTO.CartItemResponse();
        response.setCartItemId(item.getId());
        response.setProductId(item.getProduct().getId());
        response.setProductName(item.getProduct().getName());
        response.setProductPrice(item.getProduct().getPrice());
        response.setQuantity(item.getQuantity());
        response.setSubtotal(item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        return response;
    }
}
