package com.retail.service;

import com.retail.dto.OrderDTO;

import java.util.List;

public interface OrderService {
    OrderDTO.OrderResponse placeOrder(String email);

    OrderDTO.OrderResponse confirmOrder(Long orderId, String email);

    OrderDTO.OrderResponse cancelOrder(Long orderId, String email);

    List<OrderDTO.OrderResponse> getOrdersByUser(String email);

    OrderDTO.OrderResponse getOrderById(Long orderId, String email);
}
