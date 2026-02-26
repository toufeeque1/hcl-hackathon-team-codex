package com.retail.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

import java.math.BigDecimal;

public class ProductDTO {

    @Data
    public static class Request {
        @NotBlank(message = "Product name is required")
        private String name;

        private String description;

        @NotNull(message = "Price is required")
        @PositiveOrZero(message = "Price must be zero or positive")
        private BigDecimal price;

        @NotNull(message = "Stock is required")
        @PositiveOrZero(message = "Stock must be zero or positive")
        private Integer stock;

        @NotNull(message = "Brand ID is required")
        private Long brandId;

        @NotNull(message = "Category ID is required")
        private Long categoryId;

        private Long packagingId;
    }

    @Data
    public static class Response {
        private Long id;
        private String name;
        private String description;
        private BigDecimal price;
        private Integer stock;
        private String brandName;
        private String categoryName;
        private String packagingType;
        private BigDecimal packagingPrice;
    }
}
