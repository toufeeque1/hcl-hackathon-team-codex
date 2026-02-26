package com.retail.service.impl;

import com.retail.dto.ProductDTO;
import com.retail.entity.Brand;
import com.retail.entity.Category;
import com.retail.entity.Packaging;
import com.retail.entity.Product;
import com.retail.exception.ResourceNotFoundException;
import com.retail.repository.BrandRepository;
import com.retail.repository.CategoryRepository;
import com.retail.repository.PackagingRepository;
import com.retail.repository.ProductRepository;
import com.retail.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;
    private final PackagingRepository packagingRepository;

    @Override
    @Transactional
    public ProductDTO.Response createProduct(ProductDTO.Request request) {
        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new ResourceNotFoundException("Brand", request.getBrandId()));
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", request.getCategoryId()));

        Packaging packaging = null;
        if (request.getPackagingId() != null) {
            packaging = packagingRepository.findById(request.getPackagingId())
                    .orElseThrow(() -> new ResourceNotFoundException("Packaging", request.getPackagingId()));
        }

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stock(request.getStock())
                .brand(brand)
                .category(category)
                .packaging(packaging)
                .build();

        return toResponse(productRepository.save(product));
    }

    @Override
    @Transactional
    public ProductDTO.Response updateProduct(Long id, ProductDTO.Request request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", id));

        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(() -> new ResourceNotFoundException("Brand", request.getBrandId()));
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", request.getCategoryId()));

        Packaging packaging = null;
        if (request.getPackagingId() != null) {
            packaging = packagingRepository.findById(request.getPackagingId())
                    .orElseThrow(() -> new ResourceNotFoundException("Packaging", request.getPackagingId()));
        }

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setBrand(brand);
        product.setCategory(category);
        product.setPackaging(packaging);

        return toResponse(productRepository.save(product));
    }

    @Override
    public ProductDTO.Response getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product", id));
        return toResponse(product);
    }

    @Override
    public List<ProductDTO.Response> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO.Response> getProductsByCategory(Long categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("Category", categoryId);
        }
        return productRepository.findByCategoryId(categoryId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO.Response> getProductsByBrand(Long brandId) {
        if (!brandRepository.existsById(brandId)) {
            throw new ResourceNotFoundException("Brand", brandId);
        }
        return productRepository.findByBrandId(brandId).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product", id);
        }
        productRepository.deleteById(id);
    }

    private ProductDTO.Response toResponse(Product product) {
        ProductDTO.Response response = new ProductDTO.Response();
        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setStock(product.getStock());
        response.setBrandName(product.getBrand().getName());
        response.setCategoryName(product.getCategory().getName());
        if (product.getPackaging() != null) {
            response.setPackagingType(product.getPackaging().getType());
            response.setPackagingPrice(product.getPackaging().getPrice());
        }
        return response;
    }
}
