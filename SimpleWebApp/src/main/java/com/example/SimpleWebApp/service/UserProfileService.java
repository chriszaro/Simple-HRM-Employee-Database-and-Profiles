package com.example.SimpleWebApp.service;

import com.example.SimpleWebApp.model.User;
import com.example.SimpleWebApp.repository.UserProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserProfileService {

    @Autowired
    UserProfileRepo repo;

//    private ArrayList<User> users = new ArrayList<>(Arrays.asList(new User(1, "Christodoulos", "Zarogiannis", "M", "2002-04-15"), new User(2, "Christos", "Mouratidis", "M", "2002-08-02")));

    public List<User> getUsers() {
        return repo.findAll();
    }

    public List<User> search(String keyword) {
        return repo.search(keyword);
    }

    public User getUserById(int user_id) {
        //return users.stream().filter(user -> user.getUser_id() == user_id).findFirst().get();
        return repo.findById(user_id).orElse(null);
    }

    public void addUser(User user) {
        user.setBirthday(Date.from(user.getBirthday().toInstant().plusSeconds(60 * 60 * 3)));
        repo.save(user);
    }

    public void updateUser(User user) {
        repo.save(user);
    }

    public void deleteUser(int userId) {
        repo.deleteById(userId);
    }
}