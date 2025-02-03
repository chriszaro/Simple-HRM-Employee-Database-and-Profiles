package com.example.SimpleWebApp.controller;

import com.example.SimpleWebApp.model.Employee;
import com.example.SimpleWebApp.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
// https://rajendraprasadpadma.medium.com/what-the-cors-ft-spring-boot-spring-security-562f24d705c9
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping("/")
    public String greet() {
        return "Hello there";
    }

    @GetMapping("/employees")
    public ResponseEntity<List<Employee>> getEmployees() {
        return new ResponseEntity<>(employeeService.getEmployees(), HttpStatus.OK);
    }

    @GetMapping("/employees/{employeeId}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable int employeeId) {
        Employee employee = employeeService.getEmployeeById(employeeId);

        if (employee != null)
            return new ResponseEntity<>(employeeService.getEmployeeById(employeeId), HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/employees/{employeeId}/resume")
    public ResponseEntity<byte[]> getResumeById(@PathVariable int employeeId) {
        Employee employee = employeeService.getEmployeeById(employeeId);
        byte[] resumeFile = employee.getResumeFile();

        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(employee.getResumeFileType()))
                .body(resumeFile);
    }

    @PostMapping("/employees")
    public ResponseEntity<Boolean> addEmployee(@RequestPart @Valid Employee employee, BindingResult bindingResult) {
        // code for validation with spring boot
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        employeeService.addEmployee(employee);
        return new ResponseEntity<>(HttpStatus.OK);

        // code used with MY form validation
//        if (userProfileService.addUser(user))
//            return new ResponseEntity<>(HttpStatus.OK);
//        else
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/employees")
    public ResponseEntity<?> updateEmployee(@RequestPart Employee employee, @RequestPart(required = false) MultipartFile resumeFile) {
        try {
            Employee employee1;
            if (resumeFile == null)
                employee1 = employeeService.updateEmployee(employee);
            else
                employee1 = employeeService.updateEmployee(employee, resumeFile);
            return new ResponseEntity<>(employee1, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //TODO No ResponseEntity
    @DeleteMapping("/employees/{employeeId}")
    public void deleteEmployee(@PathVariable int employeeId) {
        employeeService.deleteEmployee(employeeId);
    }

    //TODO ResponseEntity is dummy, unhandled errors
    @GetMapping("/employees/search")
    public ResponseEntity<List<Employee>> search(@RequestParam String keyword) {
        System.out.println("Request received");
        return new ResponseEntity<>(employeeService.search(keyword), HttpStatus.OK);
    }
}
