package com.retail.controller;

import com.retail.dto.OrderDTO;
import com.retail.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@PreAuthorize("hasRole('CUSTOMER')")
@Tag(name = "Orders", description = "Order placement and management for customers")
@SecurityRequirement(name = "Bearer Authentication")
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/place")
    @Operation(summary = "Place order from cart")
    public ResponseEntity<OrderDTO.OrderResponse> placeOrder(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(orderService.placeOrder(userDetails.getUsername()));
    }

    @PatchMapping("/{orderId}/confirm")
    @Operation(summary = "Confirm order (reduces stock)")
    public ResponseEntity<OrderDTO.OrderResponse> confirmOrder(@PathVariable Long orderId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(orderService.confirmOrder(orderId, userDetails.getUsername()));
    }

    @PatchMapping("/{orderId}/cancel")
    @Operation(summary = "Cancel order")
    public ResponseEntity<OrderDTO.OrderResponse> cancelOrder(@PathVariable Long orderId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(orderService.cancelOrder(orderId, userDetails.getUsername()));
    }

    @GetMapping
    @Operation(summary = "Get all my orders")
    public ResponseEntity<List<OrderDTO.OrderResponse>> getMyOrders(@AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(orderService.getOrdersByUser(userDetails.getUsername()));
    }

    @GetMapping("/{orderId}")
    @Operation(summary = "Get order by ID")
    public ResponseEntity<OrderDTO.OrderResponse> getOrder(@PathVariable Long orderId,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(orderService.getOrderById(orderId, userDetails.getUsername()));
    }
}
