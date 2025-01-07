package com.example.SimpleWebApp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Transactional
@Table(name = "address")
@AllArgsConstructor
@NoArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "addr_id")
    private int addressId;
    @Column(name = "Work Address")
    @Pattern(regexp = "^[A-Za-z0-9 ,-]*$")
    private String workAddress;
    @Column(name = "Home Address")
    @Pattern(regexp = "^[A-Za-z0-9 ,-]*$")
    private String homeAddress;

//    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "address")
//    @JsonIgnore
//    private User user;
}
