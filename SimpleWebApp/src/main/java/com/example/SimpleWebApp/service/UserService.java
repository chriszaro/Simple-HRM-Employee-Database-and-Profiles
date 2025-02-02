package com.example.SimpleWebApp.service;

import com.example.SimpleWebApp.model.UserCredential;
import com.example.SimpleWebApp.repository.UserCredentialRepo;
import com.fasterxml.jackson.databind.annotation.JsonAppend;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserCredentialsService {

    @Autowired
    UserCredentialRepo repo;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    JWTService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public UserCredential register(UserCredential user){
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    // We need to verify ourselves for JWT because we use our own AuthenticationManager
    public String verify(UserCredential user) {
        Authentication authentication =
                authManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                user.getUsername(), user.getPassword()));

        if (authentication.isAuthenticated())
            return jwtService.generateToken(user.getUsername());
        return "fail";
    }
}
