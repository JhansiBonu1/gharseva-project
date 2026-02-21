package com.example.proj1.Model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String username;
    private String location;
    private String phone;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;


    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Details> details = new ArrayList<>();

    private LocalDateTime dateTime;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getLocation() { return location; }
    public void setLocation(String Location) { this.location = Location; }

     public void setDateTime(LocalDateTime dateTime){
        this.dateTime=dateTime;
    }

    public LocalDateTime getDateTime(){
        return this.dateTime;
    }

     public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail(){ return email; }
    public void setEmail(String email){ this.email=email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public Account getAccount() { return account; }
    public void setAccount(Account account) { this.account = account; }

    public List<Details> getDetails() { return details; }
    public void setDetails(List<Details> details) { this.details = details; }
}
