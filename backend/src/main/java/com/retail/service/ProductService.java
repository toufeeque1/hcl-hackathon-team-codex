package com.retail.service;

import com.retail.dto.ProductDTO;

import java.util.List;

public interface ProductService {
    ProductDTO.Response createProduct(ProductDTO.Request request);

    ProductDTO.Response updateProduct(Long id, ProductDTO.Request request);

    ProductDTO.Response getProductById(Long id);

    List<ProductDTO.Response> getAllProducts();

    List<ProductDTO.Response> getProductsByCategory(Long categoryId);

    List<ProductDTO.Response> getProductsByBrand(Long brandId);

    void deleteProduct(Long id);
}
