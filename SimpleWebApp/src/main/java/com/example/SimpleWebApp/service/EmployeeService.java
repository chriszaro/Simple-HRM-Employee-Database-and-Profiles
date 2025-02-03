package com.example.SimpleWebApp.service;

import com.example.SimpleWebApp.model.Employee;
import com.example.SimpleWebApp.repository.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class EmployeeService {

    @Autowired
    EmployeeRepo repo;

//    private ArrayList<User> users = new ArrayList<>(Arrays.asList(new User(1, "Christodoulos", "Zarogiannis", "M", "2002-04-15"), new User(2, "Christos", "Mouratidis", "M", "2002-08-02")));

    public List<Employee> getEmployees() {
        return repo.findAll();
    }

    public List<Employee> search(String keyword) {
        HashSet<Employee> set = new HashSet<>();
        set.addAll(repo.search(keyword));
        set.addAll(repo.search2(keyword));
        return new ArrayList<>(set);
//        return repo.search(keyword);
    }

    public Employee getEmployeeById(int employeeId) {
        //return users.stream().filter(user -> user.getUser_id() == employeeId).findFirst().get();
        return repo.findById(employeeId).orElse(null);
    }

    public void addEmployee(Employee employee) {
        employee.setBirthday(Date.from(employee.getBirthday().toInstant().plusSeconds(60 * 60 * 3)));
        repo.save(employee);
    }

    public Employee updateEmployee(Employee employee, MultipartFile resumeFile) throws IOException {
        employee.setResumeFile(resumeFile.getBytes());
        employee.setResumeFileName(resumeFile.getOriginalFilename());
        employee.setResumeFileType(resumeFile.getContentType());
        return repo.save(employee);
    }
    public Employee updateEmployee(Employee employee) {
        return repo.save(employee);
    }

    public void deleteEmployee(int userId) {
        repo.deleteById(userId);
    }
}