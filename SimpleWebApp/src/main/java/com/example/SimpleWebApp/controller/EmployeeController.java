package com.example.SimpleWebApp.controller;

import com.example.SimpleWebApp.model.Employee;
import com.example.SimpleWebApp.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// https://rajendraprasadpadma.medium.com/what-the-cors-ft-spring-boot-spring-security-562f24d705c9
@CrossOrigin(origins="http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping("/")
    public String greet() {
        return "Hello there";
    }

    @GetMapping("/users")
    public ResponseEntity<List<Employee>> getUsers() {
        return new ResponseEntity<>(employeeService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/users/{user_id}")
    public ResponseEntity<Employee> getUserById(@PathVariable int user_id) {
        Employee employee = employeeService.getUserById(user_id);

        if (employee != null)
            return new ResponseEntity<>(employeeService.getUserById(user_id), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/users")
    public ResponseEntity<Boolean> addUser(@RequestPart @Valid Employee employee, BindingResult bindingResult) {
        // code for validation with spring boot
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        employeeService.addUser(employee);
        return new ResponseEntity<>(HttpStatus.OK);

        // code used with MY form validation
//        if (userProfileService.addUser(user))
//            return new ResponseEntity<>(HttpStatus.OK);
//        else
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/users")
    public void updateUser(@RequestPart Employee employee) {
        employeeService.updateUser(employee);
    }

    @DeleteMapping("/users/{user_id}")
    public void deleteUser(@PathVariable int user_id) {
        employeeService.deleteUser(user_id);
    }

    @GetMapping("/users/search")
    public ResponseEntity<List<Employee>> search(@RequestParam String keyword) {
        System.out.println("Request received");
        return new ResponseEntity<>(employeeService.search(keyword), HttpStatus.OK);
    }
}
