package com.example.SimpleWebApp.model;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Transactional
@Table(name = "user")
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    // orphanRemoval -> if address is set to null,
    // the address record that was previously associated
    // with the user will be deleted
    // orphanRemoval = true is not necessary in our case because the above senario cannot happen

    // eager -> the data of address will be fetched immediately with the user

    // cascade all -> all = (persist, merge, remove, refresh, and detach)
    // if you delete the user, the address will be also deleted
    // if the user is reloaded, the address will be also reloaded
    // Persist = save, Merge = updated, Refresh = reload
    // JPA does not offer restrict
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name="fk_addr_id", referencedColumnName = "addr_id")
    private Address address;

    @Column(name = "Name")
    private String name;
    @Column(name = "Surname")
    private String surname;
    @Column(name = "Gender")
    private Boolean gender;
    @Column(name = "Birthday")
    private Date birthday;
//    @Column(name = "Work Address")
//    private String workAddress;
//    @Column(name = "Home Address")
//    private String homeAddress;

    // Necessary for POST request add new user
    public User() {
    }

    public User(int userId, String name, String surname, Boolean gender, Date birthday) {
        this.userId = userId;
        this.name = name;
        this.surname = surname;
        this.gender = gender;
        this.birthday = birthday;
    }
}
