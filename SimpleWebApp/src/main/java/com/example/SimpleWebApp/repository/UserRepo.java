package com.example.SimpleWebApp.repository;

import com.example.SimpleWebApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Integer> {
    User findByUsername(String username);
}
