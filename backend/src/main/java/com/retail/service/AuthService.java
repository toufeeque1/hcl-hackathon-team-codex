package com.retail.service;

import com.retail.dto.AuthDTO;

public interface AuthService {
    String register(AuthDTO.RegisterRequest request);

    AuthDTO.LoginResponse login(AuthDTO.LoginRequest request);
}
