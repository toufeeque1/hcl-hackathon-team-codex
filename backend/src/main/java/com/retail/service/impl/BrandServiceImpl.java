package com.retail.service.impl;

import com.retail.dto.BrandDTO;
import com.retail.entity.Brand;
import com.retail.exception.ResourceNotFoundException;
import com.retail.repository.BrandRepository;
import com.retail.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;

    @Override
    @Transactional
    public BrandDTO createBrand(BrandDTO dto) {
        if (brandRepository.existsByName(dto.getName())) {
            throw new IllegalArgumentException("Brand already exists with name: " + dto.getName());
        }
        Brand brand = Brand.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .build();
        return toDTO(brandRepository.save(brand));
    }

    @Override
    @Transactional
    public BrandDTO updateBrand(Long id, BrandDTO dto) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand", id));
        brand.setName(dto.getName());
        brand.setDescription(dto.getDescription());
        return toDTO(brandRepository.save(brand));
    }

    @Override
    public BrandDTO getBrandById(Long id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Brand", id));
        return toDTO(brand);
    }

    @Override
    public List<BrandDTO> getAllBrands() {
        return brandRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteBrand(Long id) {
        if (!brandRepository.existsById(id)) {
            throw new ResourceNotFoundException("Brand", id);
        }
        brandRepository.deleteById(id);
    }

    private BrandDTO toDTO(Brand brand) {
        BrandDTO dto = new BrandDTO();
        dto.setId(brand.getId());
        dto.setName(brand.getName());
        dto.setDescription(brand.getDescription());
        return dto;
    }
}
