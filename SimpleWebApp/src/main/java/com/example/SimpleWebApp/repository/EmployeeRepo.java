package com.example.SimpleWebApp.repository;

import com.example.SimpleWebApp.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepo extends JpaRepository<Employee, Integer> {

    @Query("SELECT emp from Employee emp WHERE " +
            "LOWER(emp.name) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER(emp.surname) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Employee> search(String keyword);

    @Query("SELECT emp " +
            "from Employee emp JOIN emp.address adr " +
            "WHERE " +
            "LOWER(adr.homeAddress) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER(adr.workAddress) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Employee> search2(String keyword);

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

//OLD
//@Query("SELECT usr from User usr WHERE " +
//        "LOWER(usr.name) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
//        "OR LOWER(usr.surname) LIKE LOWER(CONCAT('%', :keyword, '%'))")
//List<Employee> search(String keyword);
//
//@Query("SELECT usr " +
//        "from User usr JOIN usr.address adr " +
//        "WHERE " +
//        "LOWER(adr.homeAddress) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
//        "OR LOWER(adr.workAddress) LIKE LOWER(CONCAT('%', :keyword, '%'))")
//List<Employee> search2(String keyword);
