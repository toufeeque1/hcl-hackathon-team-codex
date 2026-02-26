package com.retail.service;

import com.retail.dto.BrandDTO;

import java.util.List;

public interface BrandService {
    BrandDTO createBrand(BrandDTO dto);

    BrandDTO updateBrand(Long id, BrandDTO dto);

    BrandDTO getBrandById(Long id);

    List<BrandDTO> getAllBrands();

    void deleteBrand(Long id);
}
