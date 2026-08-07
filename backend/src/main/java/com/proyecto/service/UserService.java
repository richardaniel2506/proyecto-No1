package com.proyecto.service;

import com.proyecto.dto.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse getCurrentUser(String email);
    List<UserResponse> getAllUsers();
}
