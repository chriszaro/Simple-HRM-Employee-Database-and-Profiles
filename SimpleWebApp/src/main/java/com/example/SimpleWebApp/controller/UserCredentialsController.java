package com.example.SimpleWebApp.controller;

import com.example.SimpleWebApp.model.UserCredential;
import com.example.SimpleWebApp.service.UserCredentialsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
//https://rajendraprasadpadma.medium.com/what-the-cors-ft-spring-boot-spring-security-562f24d705c9
@CrossOrigin(origins="http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api")
public class UserCredentialsController {
    @Autowired
    UserCredentialsService userCredentialsService;

    @PostMapping("/create_credentials")
    public UserCredential createCredentials(@RequestBody UserCredential user){
        return userCredentialsService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody UserCredential user){
        return "POST LOGIN";
    }

    @GetMapping("/login")
    public String greet(){
        return "GET LOGIN";
    }

}
