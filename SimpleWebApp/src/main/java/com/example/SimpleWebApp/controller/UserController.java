package com.example.SimpleWebApp.controller;

import com.example.SimpleWebApp.model.User;
import com.example.SimpleWebApp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
//https://rajendraprasadpadma.medium.com/what-the-cors-ft-spring-boot-spring-security-562f24d705c9
@CrossOrigin(origins="http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/create_credentials")
    public User createCredentials(@RequestBody User user){
        return userService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody User user){
        return userService.verify(user);
    }

    @GetMapping("/login")
    public String greet(){
        return "GET LOGIN";
    }

}
