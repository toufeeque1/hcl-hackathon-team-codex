package com.retail.config;

import com.retail.entity.User;
import com.retail.entity.enums.Role;
import com.retail.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Create ADMIN user if not exists
        if (!userRepository.existsByEmail("admin@retail.com")) {
            User admin = User.builder()
                    .name("Admin User")
                    .email("admin@retail.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .build();
            userRepository.save(admin);
            log.info("✅ Admin user created: admin@retail.com / admin123");
        }

        // Create CUSTOMER user if not exists
        if (!userRepository.existsByEmail("customer@retail.com")) {
            User customer = User.builder()
                    .name("John Customer")
                    .email("customer@retail.com")
                    .password(passwordEncoder.encode("customer123"))
                    .role(Role.CUSTOMER)
                    .build();
            userRepository.save(customer);
            log.info("✅ Customer user created: customer@retail.com / customer123");
        }
    }
}
