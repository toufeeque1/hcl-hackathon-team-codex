package com.retail.controller;

import com.retail.dto.PackagingDTO;
import com.retail.service.PackagingService;
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
@RequestMapping("/api/admin/packagings")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin - Packaging", description = "CRUD APIs for packaging types (Admin only)")
@SecurityRequirement(name = "Bearer Authentication")
public class PackagingController {

    private final PackagingService packagingService;

    @PostMapping
    @Operation(summary = "Create a new packaging type")
    public ResponseEntity<PackagingDTO> createPackaging(@Valid @RequestBody PackagingDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(packagingService.createPackaging(dto));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update packaging")
    public ResponseEntity<PackagingDTO> updatePackaging(@PathVariable Long id, @Valid @RequestBody PackagingDTO dto) {
        return ResponseEntity.ok(packagingService.updatePackaging(id, dto));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get packaging by ID")
    public ResponseEntity<PackagingDTO> getPackaging(@PathVariable Long id) {
        return ResponseEntity.ok(packagingService.getPackagingById(id));
    }

    @GetMapping
    @Operation(summary = "Get all packaging types")
    public ResponseEntity<List<PackagingDTO>> getAllPackagings() {
        return ResponseEntity.ok(packagingService.getAllPackaging());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete packaging")
    public ResponseEntity<String> deletePackaging(@PathVariable Long id) {
        packagingService.deletePackaging(id);
        return ResponseEntity.ok("Packaging deleted successfully");
    }
}
