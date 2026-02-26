package com.retail.service;

import com.retail.dto.CategoryDTO;

import java.util.List;

public interface CategoryService {
    CategoryDTO createCategory(CategoryDTO dto);

    CategoryDTO updateCategory(Long id, CategoryDTO dto);

    CategoryDTO getCategoryById(Long id);

    List<CategoryDTO> getAllCategories();

    void deleteCategory(Long id);
}
