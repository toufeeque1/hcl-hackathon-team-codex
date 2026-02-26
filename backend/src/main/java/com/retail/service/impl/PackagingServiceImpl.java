package com.retail.service.impl;

import com.retail.dto.PackagingDTO;
import com.retail.entity.Packaging;
import com.retail.exception.ResourceNotFoundException;
import com.retail.repository.PackagingRepository;
import com.retail.service.PackagingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PackagingServiceImpl implements PackagingService {

    private final PackagingRepository packagingRepository;

    @Override
    @Transactional
    public PackagingDTO createPackaging(PackagingDTO dto) {
        Packaging packaging = Packaging.builder()
                .type(dto.getType())
                .price(dto.getPrice())
                .build();
        return toDTO(packagingRepository.save(packaging));
    }

    @Override
    @Transactional
    public PackagingDTO updatePackaging(Long id, PackagingDTO dto) {
        Packaging packaging = packagingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Packaging", id));
        packaging.setType(dto.getType());
        packaging.setPrice(dto.getPrice());
        return toDTO(packagingRepository.save(packaging));
    }

    @Override
    public PackagingDTO getPackagingById(Long id) {
        Packaging packaging = packagingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Packaging", id));
        return toDTO(packaging);
    }

    @Override
    public List<PackagingDTO> getAllPackaging() {
        return packagingRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deletePackaging(Long id) {
        if (!packagingRepository.existsById(id)) {
            throw new ResourceNotFoundException("Packaging", id);
        }
        packagingRepository.deleteById(id);
    }

    private PackagingDTO toDTO(Packaging packaging) {
        PackagingDTO dto = new PackagingDTO();
        dto.setId(packaging.getId());
        dto.setType(packaging.getType());
        dto.setPrice(packaging.getPrice());
        return dto;
    }
}
