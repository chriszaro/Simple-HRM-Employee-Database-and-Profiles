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

    public Boolean addUser(User user) {
        // Data Validation
        Pattern pattern = Pattern.compile("^[A-Za-z]+ ?-? ?[A-Za-z]*$", Pattern.CASE_INSENSITIVE);
        Matcher matcher = pattern.matcher(user.getName());
        boolean matchFound = matcher.find();
        if (!matchFound) return false;
        else {
            matcher = pattern.matcher(user.getSurname());
            matchFound = matcher.find();
            if (!matchFound) return false;
            else {
                pattern = Pattern.compile("^[A-Za-z0-9 ,-]*$", Pattern.CASE_INSENSITIVE);
                matcher = pattern.matcher(user.getAddress().getWorkAddress());
                matchFound = matcher.find();
                if (!matchFound) return false;
                else {
                    matcher = pattern.matcher(user.getAddress().getHomeAddress());
                    matchFound = matcher.find();
                    if (!matchFound) return false;
                    else {
                        // subtract 2 hours to get right day due to timezone problem
                        user.setBirthday(Date.from(user.getBirthday().toInstant().plusSeconds(60 * 60 * 3)));
                        repo.save(user);
                        return true;
                    }
                }
            }
        }
    }

    public void updateUser(User user) {
        repo.save(user);
    }

    public void deleteUser(int userId) {
        repo.deleteById(userId);
    }
}
