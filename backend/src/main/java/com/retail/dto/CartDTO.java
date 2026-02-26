package com.retail.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

public class CartDTO {

    @Data
    public static class AddItemRequest {
        @NotNull(message = "Product ID is required")
        private Long productId;

        @NotNull(message = "Quantity is required")
        @Positive(message = "Quantity must be positive")
        private Integer quantity;
    }

    @Data
    public static class UpdateItemRequest {
        @NotNull(message = "Quantity is required")
        @Positive(message = "Quantity must be positive")
        private Integer quantity;
    }

    @Data
    public static class CartItemResponse {
        private Long cartItemId;
        private Long productId;
        private String productName;
        private BigDecimal productPrice;
        private Integer quantity;
        private BigDecimal subtotal;
    }

    @Data
    public static class CartResponse {
        private Long cartId;
        private List<CartItemResponse> items;
        private BigDecimal totalAmount;
    }
}
