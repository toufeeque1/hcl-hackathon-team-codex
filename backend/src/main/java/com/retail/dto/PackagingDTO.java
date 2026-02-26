package com.retail.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PackagingDTO {
    private Long id;

    @NotBlank(message = "Packaging type is required")
    private String type;

    @NotNull(message = "Packaging price is required")
    @Positive(message = "Price must be positive")
    private BigDecimal price;
}
