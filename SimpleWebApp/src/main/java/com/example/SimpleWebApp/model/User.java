package com.example.SimpleWebApp.model;

import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Transactional
@Table(name = "userCredentials")
@AllArgsConstructor
@NoArgsConstructor
public class UserCredential {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userC_id")
    private int userCId;

//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
//    @JoinColumn(name="fk_user_id", referencedColumnName = "user_id")
//    private User user;

    @Column(name = "Username")
    private String username;
    @Column(name = "Password")
    private String password;
}
