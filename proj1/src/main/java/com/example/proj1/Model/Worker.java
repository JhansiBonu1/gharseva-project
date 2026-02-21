package com.example.proj1.Model;

import jakarta.persistence.*;

@Entity
public class Worker {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Crucial for fixing "Duplicate entry"
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    private String location;
    private String skill;
    private String password;
    private boolean available = true; // Matches findBySkillIgnoreCaseAndAvailableTrue
    private boolean active = true;    // Matches findByActiveTrue

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;


    // Standard Getters and Setters...
     public Long getId() { return id; }
    
    public String getPassword() { return this.password; }
    public void setPassword(String psw) { this.password = psw; }

    //public String getDescription() { return this.description; }
   // public void setDescription(String desc) { this.description = desc; }

    public String getUsername() { return this.username; }
    public void setUsername(String name) { this.username = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

   // public String getPhone() { return phone; }
    //public void setPhone(String phone) { this.phone = phone; }

    public String getSkill() { return skill; }
    public void setSkill(String skill) { this.skill = skill; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public boolean getAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }

    public boolean getActive() { return active; }
    public void setActive(boolean act) { this.active = act; }

    public Account getAccount() { return account; }
    public void setAccount(Account account) { this.account = account; }
}