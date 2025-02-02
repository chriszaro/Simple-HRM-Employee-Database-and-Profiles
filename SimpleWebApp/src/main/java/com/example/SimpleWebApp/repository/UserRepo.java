package com.example.SimpleWebApp.repository;

import com.example.SimpleWebApp.model.UserCredential;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserCredentialRepo extends JpaRepository<UserCredential, Integer> {
    UserCredential findByUsername(String username);
}
