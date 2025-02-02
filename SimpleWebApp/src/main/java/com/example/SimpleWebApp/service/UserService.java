package com.example.SimpleWebApp.service;

import com.example.SimpleWebApp.model.User;
import com.example.SimpleWebApp.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepo repo;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    JWTService jwtService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public User register(User user){
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    // We need to verify ourselves for JWT because we use our own AuthenticationManager
    public String verify(User user) {
        Authentication authentication =
                authManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                user.getUsername(), user.getPassword()));

        if (authentication.isAuthenticated())
            return jwtService.generateToken(user.getUsername());
        return "fail";
    }
}
