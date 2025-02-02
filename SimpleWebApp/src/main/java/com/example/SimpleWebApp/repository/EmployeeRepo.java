package com.example.SimpleWebApp.repository;

import com.example.SimpleWebApp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserProfileRepo extends JpaRepository<User, Integer> {

    @Query("SELECT usr from User usr WHERE " +
            "LOWER(usr.name) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER(usr.surname) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<User> search(String keyword);

    @Query("SELECT usr " +
            "from User usr JOIN usr.address adr " +
            "WHERE " +
            "LOWER(adr.homeAddress) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER(adr.workAddress) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<User> search2(String keyword);

//    @Query(value = "SELECT *" +
//            " FROM user INNER JOIN address" +
//            " ON user.fk_addr_id=address.addr_id" +
//            " WHERE LOWER(address.`home address`)" +
//            " LIKE LOWER(CONCAT('%', ?1, '%'))" +
//            " OR LOWER(address.`work address`)" +
//            " LIKE LOWER(CONCAT('%', ?1, '%'));",
//            nativeQuery = true)
//    List<User> search3(String keyword);
}
