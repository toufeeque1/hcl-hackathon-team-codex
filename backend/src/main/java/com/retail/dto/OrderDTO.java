package com.retail.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDTO {

    @Data
    public static class OrderItemResponse {
        private Long productId;
        private String productName;
        private Integer quantity;
        private BigDecimal price;
        private BigDecimal subtotal;
    }

    @Data
    public static class OrderResponse {
        private Long orderId;
        private String status;
        private BigDecimal totalAmount;
        private LocalDateTime createdAt;
        private List<OrderItemResponse> items;
    }
}
