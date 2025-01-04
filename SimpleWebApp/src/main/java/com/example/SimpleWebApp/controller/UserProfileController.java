package com.example.SimpleWebApp.controller;

import com.example.SimpleWebApp.service.UserProfileService;
import com.example.SimpleWebApp.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// https://rajendraprasadpadma.medium.com/what-the-cors-ft-spring-boot-spring-security-562f24d705c9
@CrossOrigin(origins="http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api")
public class UserProfileController {

    @Autowired
    UserProfileService userProfileService;

    @GetMapping("/")
    public String greet() {
        return "Hello there";
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userProfileService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/users/{user_id}")
    public ResponseEntity<User> getUserById(@PathVariable int user_id) {
        User user = userProfileService.getUserById(user_id);

        if (user != null)
            return new ResponseEntity<>(userProfileService.getUserById(user_id), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/users")
    public ResponseEntity<Boolean> addUser(@RequestPart User user) {
        if (userProfileService.addUser(user))
            return new ResponseEntity<>(HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/users")
    public void updateUser(@RequestPart User user) {
        userProfileService.updateUser(user);
    }

    @DeleteMapping("/users/{user_id}")
    public void deleteUser(@PathVariable int user_id) {
        userProfileService.deleteUser(user_id);
    }

    @GetMapping("/users/search")
    public ResponseEntity<List<User>> search(@RequestParam String keyword) {
        System.out.println("Request received");
        return new ResponseEntity<>(userProfileService.search(keyword), HttpStatus.OK);
    }
}
