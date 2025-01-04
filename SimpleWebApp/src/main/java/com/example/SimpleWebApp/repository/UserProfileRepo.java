package com.example.SimpleWebApp.repository;

import com.example.SimpleWebApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserProfileRepo extends JpaRepository<User, Integer> {

    @Query("SELECT usr from User usr WHERE "+
            "LOWER(usr.name) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER(usr.surname) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<User> search (String keyword);

}
