package com.retail.service;

import com.retail.dto.CartDTO;

public interface CartService {
    CartDTO.CartResponse getCart(String email);

    CartDTO.CartResponse addItemToCart(String email, CartDTO.AddItemRequest request);

    CartDTO.CartResponse updateCartItem(String email, Long cartItemId, CartDTO.UpdateItemRequest request);

    CartDTO.CartResponse removeItemFromCart(String email, Long cartItemId);

    void clearCart(String email);
}
