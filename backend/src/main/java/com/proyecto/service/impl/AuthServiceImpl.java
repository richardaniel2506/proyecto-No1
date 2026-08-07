package com.proyecto.service.impl;

import com.proyecto.dto.LoginRequest;
import com.proyecto.dto.LoginResponse;
import com.proyecto.dto.RegisterRequest;
import com.proyecto.dto.UserResponse;
import com.proyecto.entity.Role;
import com.proyecto.entity.User;
import com.proyecto.repository.RoleRepository;
import com.proyecto.repository.UserRepository;
import com.proyecto.security.JwtUtil;
import com.proyecto.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtil jwtUtil;

    @Override
    public LoginResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateJwtToken(authentication);

        return new LoginResponse(jwt);
    }

    @Override
    public UserResponse registerUser(RegisterRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("Error: El email ya está en uso");
        }

        User user = User.builder()
                .nombre(signUpRequest.getNombre())
                .apellido(signUpRequest.getApellido())
                .email(signUpRequest.getEmail())
                .password(encoder.encode(signUpRequest.getPassword()))
                .enabled(true)
                .build();

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByNombre("ROLE_USER")
                .orElseThrow(() -> new RuntimeException("Error: Rol no encontrado."));
        roles.add(userRole);
        user.setRoles(roles);

        userRepository.save(user);

        return UserResponse.builder()
                .id(user.getId())
                .nombre(user.getNombre())
                .apellido(user.getApellido())
                .email(user.getEmail())
                .roles(user.getRoles().stream().map(Role::getNombre).collect(Collectors.toList()))
                .build();
    }
}
