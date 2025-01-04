package com.example.SimpleWebApp.service;

import com.example.SimpleWebApp.model.UserCredential;
import com.example.SimpleWebApp.repository.UserCredentialRepo;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserCredentialsService {

    @Autowired
    UserCredentialRepo repo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public UserCredential register(UserCredential user){
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }
}
