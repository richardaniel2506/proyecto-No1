package com.proyecto.service;

import com.proyecto.dto.LoginRequest;
import com.proyecto.dto.LoginResponse;
import com.proyecto.dto.RegisterRequest;
import com.proyecto.dto.UserResponse;

public interface AuthService {
    LoginResponse authenticateUser(LoginRequest loginRequest);
    UserResponse registerUser(RegisterRequest registerRequest);
}
