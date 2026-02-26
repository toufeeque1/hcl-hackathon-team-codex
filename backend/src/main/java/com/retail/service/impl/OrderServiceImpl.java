package com.retail.service.impl;

import com.retail.dto.OrderDTO;
import com.retail.entity.*;
import com.retail.entity.enums.OrderStatus;
import com.retail.exception.InsufficientStockException;
import com.retail.exception.ResourceNotFoundException;
import com.retail.exception.UnauthorizedException;
import com.retail.repository.CartRepository;
import com.retail.repository.OrderRepository;
import com.retail.repository.ProductRepository;
import com.retail.repository.UserRepository;
import com.retail.service.CartService;
import com.retail.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final CartService cartService;

    @Override
    @Transactional
    public OrderDTO.OrderResponse placeOrder(String email) {
        User user = getUser(email);
        Cart cart = cartRepository.findByUser(user)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for user: " + email));

        if (cart.getItems().isEmpty()) {
            throw new IllegalArgumentException("Cart is empty. Add items before placing an order.");
        }

        Order order = Order.builder()
                .user(user)
                .status(OrderStatus.CREATED)
                .totalAmount(BigDecimal.ZERO)
                .orderItems(new ArrayList<>())
                .build();

        BigDecimal total = BigDecimal.ZERO;
        for (CartItem cartItem : cart.getItems()) {
            BigDecimal itemTotal = cartItem.getProduct().getPrice()
                    .multiply(BigDecimal.valueOf(cartItem.getQuantity()));
            total = total.add(itemTotal);

            OrderItem orderItem = OrderItem.builder()
                    .product(cartItem.getProduct())
                    .quantity(cartItem.getQuantity())
                    .price(cartItem.getProduct().getPrice())
                    .order(order)
                    .build();
            order.getOrderItems().add(orderItem);
        }

        order.setTotalAmount(total);
        Order savedOrder = orderRepository.save(order);

        // Clear cart after placing order
        cartService.clearCart(email);

        return toOrderResponse(savedOrder);
    }

    @Override
    @Transactional
    public OrderDTO.OrderResponse confirmOrder(Long orderId, String email) {
        Order order = getOrderForUser(orderId, email);

        if (order.getStatus() != OrderStatus.CREATED) {
            throw new IllegalArgumentException("Only CREATED orders can be confirmed.");
        }

        // Reduce inventory
        for (OrderItem item : order.getOrderItems()) {
            Product product = productRepository.findById(item.getProduct().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product", item.getProduct().getId()));

            if (product.getStock() < item.getQuantity()) {
                throw new InsufficientStockException(product.getName(), item.getQuantity(), product.getStock());
            }
            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product);
        }

        order.setStatus(OrderStatus.CONFIRMED);
        return toOrderResponse(orderRepository.save(order));
    }

    @Override
    @Transactional
    public OrderDTO.OrderResponse cancelOrder(Long orderId, String email) {
        Order order = getOrderForUser(orderId, email);

        if (order.getStatus() == OrderStatus.CONFIRMED) {
            throw new IllegalArgumentException("CONFIRMED orders cannot be cancelled.");
        }

        order.setStatus(OrderStatus.CANCELLED);
        return toOrderResponse(orderRepository.save(order));
    }

    @Override
    public List<OrderDTO.OrderResponse> getOrdersByUser(String email) {
        User user = getUser(email);
        return orderRepository.findByUser(user).stream()
                .map(this::toOrderResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderDTO.OrderResponse getOrderById(Long orderId, String email) {
        Order order = getOrderForUser(orderId, email);
        return toOrderResponse(order);
    }

    private Order getOrderForUser(Long orderId, String email) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order", orderId));
        if (!order.getUser().getEmail().equals(email)) {
            throw new UnauthorizedException("You do not have access to this order.");
        }
        return order;
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    private OrderDTO.OrderResponse toOrderResponse(Order order) {
        List<OrderDTO.OrderItemResponse> items = order.getOrderItems().stream()
                .map(this::toItemResponse)
                .collect(Collectors.toList());

        OrderDTO.OrderResponse response = new OrderDTO.OrderResponse();
        response.setOrderId(order.getId());
        response.setStatus(order.getStatus().name());
        response.setTotalAmount(order.getTotalAmount());
        response.setCreatedAt(order.getCreatedAt());
        response.setItems(items);
        return response;
    }

    private OrderDTO.OrderItemResponse toItemResponse(OrderItem item) {
        OrderDTO.OrderItemResponse response = new OrderDTO.OrderItemResponse();
        response.setProductId(item.getProduct().getId());
        response.setProductName(item.getProduct().getName());
        response.setQuantity(item.getQuantity());
        response.setPrice(item.getPrice());
        response.setSubtotal(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        return response;
    }
}
