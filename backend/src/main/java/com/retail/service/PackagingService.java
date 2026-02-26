package com.retail.service;

import com.retail.dto.PackagingDTO;

import java.util.List;

public interface PackagingService {
    PackagingDTO createPackaging(PackagingDTO dto);

    PackagingDTO updatePackaging(Long id, PackagingDTO dto);

    PackagingDTO getPackagingById(Long id);

    List<PackagingDTO> getAllPackaging();

    void deletePackaging(Long id);
}
