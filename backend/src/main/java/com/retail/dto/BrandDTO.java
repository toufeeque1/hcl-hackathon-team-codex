package com.retail.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BrandDTO {
    private Long id;

    @NotBlank(message = "Brand name is required")
    private String name;

    private String description;
}
