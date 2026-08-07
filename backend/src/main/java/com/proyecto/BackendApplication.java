package com.proyecto;

import com.proyecto.entity.Role;
import com.proyecto.entity.User;
import com.proyecto.repository.RoleRepository;
import com.proyecto.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
		return args -> {
			if (!userRepository.existsByEmail("admin@example.com")) {
				Role adminRole = roleRepository.findByNombre("ROLE_ADMIN").orElseThrow();
				Role userRole = roleRepository.findByNombre("ROLE_USER").orElseThrow();
				Set<Role> adminRoles = new HashSet<>();
				adminRoles.add(adminRole);
				adminRoles.add(userRole);

				User admin = User.builder()
						.nombre("Admin")
						.apellido("System")
						.email("admin@example.com")
						.password(passwordEncoder.encode("admin123"))
						.enabled(true)
						.roles(adminRoles)
						.build();
				userRepository.save(admin);
			}

			if (!userRepository.existsByEmail("user@example.com")) {
				Role userRole = roleRepository.findByNombre("ROLE_USER").orElseThrow();
				Set<Role> userRoles = new HashSet<>();
				userRoles.add(userRole);

				User user = User.builder()
						.nombre("User")
						.apellido("Normal")
						.email("user@example.com")
						.password(passwordEncoder.encode("user123"))
						.enabled(true)
						.roles(userRoles)
						.build();
				userRepository.save(user);
			}
		};
	}
}
