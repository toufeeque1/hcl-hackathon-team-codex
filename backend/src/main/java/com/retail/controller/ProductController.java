package com.retail.controller;

import com.retail.dto.ProductDTO;
import com.retail.service.ProductService;
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
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name = "Products", description = "Product APIs - public browsing and admin management")
public class ProductController {

    private final ProductService productService;

    // ─── ADMIN ONLY ────────────────────────────────────────────
    @PostMapping("/admin/products")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Create product (Admin only)")
    public ResponseEntity<ProductDTO.Response> createProduct(@Valid @RequestBody ProductDTO.Request request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(request));
    }

    @PutMapping("/admin/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Update product (Admin only)")
    public ResponseEntity<ProductDTO.Response> updateProduct(@PathVariable Long id,
            @Valid @RequestBody ProductDTO.Request request) {
        return ResponseEntity.ok(productService.updateProduct(id, request));
    }

    @DeleteMapping("/admin/products/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "Bearer Authentication")
    @Operation(summary = "Delete product (Admin only)")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");
    }

    // ─── PUBLIC ENDPOINTS ────────────────────────────────────────────
    @GetMapping("/products")
    @Operation(summary = "Get all products (public)")
    public ResponseEntity<List<ProductDTO.Response>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/products/{id}")
    @Operation(summary = "Get product by ID (public)")
    public ResponseEntity<ProductDTO.Response> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/products/category/{categoryId}")
    @Operation(summary = "Filter products by category (public)")
    public ResponseEntity<List<ProductDTO.Response>> getByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(productService.getProductsByCategory(categoryId));
    }

    @GetMapping("/products/brand/{brandId}")
    @Operation(summary = "Filter products by brand (public)")
    public ResponseEntity<List<ProductDTO.Response>> getByBrand(@PathVariable Long brandId) {
        return ResponseEntity.ok(productService.getProductsByBrand(brandId));
    }
}
