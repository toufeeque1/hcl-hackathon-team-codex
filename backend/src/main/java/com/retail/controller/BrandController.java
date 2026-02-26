package com.retail.controller;

import com.retail.dto.BrandDTO;
import com.retail.service.BrandService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/brands")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin - Brands", description = "CRUD APIs for brands (Admin only)")
@SecurityRequirement(name = "Bearer Authentication")
public class BrandController {

    private final BrandService brandService;

    @PostMapping
    @Operation(summary = "Create a new brand")
    public ResponseEntity<BrandDTO> createBrand(@Valid @RequestBody BrandDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(brandService.createBrand(dto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a brand")
    public ResponseEntity<BrandDTO> updateBrand(@PathVariable Long id, @Valid @RequestBody BrandDTO dto) {
        return ResponseEntity.ok(brandService.updateBrand(id, dto));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get brand by ID")
    public ResponseEntity<BrandDTO> getBrand(@PathVariable Long id) {
        return ResponseEntity.ok(brandService.getBrandById(id));
    }

    @GetMapping
    @Operation(summary = "Get all brands")
    public ResponseEntity<List<BrandDTO>> getAllBrands() {
        return ResponseEntity.ok(brandService.getAllBrands());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a brand")
    public ResponseEntity<String> deleteBrand(@PathVariable Long id) {
        brandService.deleteBrand(id);
        return ResponseEntity.ok("Brand deleted successfully");
    }
}
