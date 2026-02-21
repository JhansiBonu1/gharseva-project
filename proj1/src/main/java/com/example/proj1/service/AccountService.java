package com.example.proj1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.proj1.Model.Account;
import com.example.proj1.repository.AccountRepository;

import jakarta.servlet.http.HttpSession;

@Service
public class AccountService {

    @Autowired
    private AccountRepository ar; // We will use 'ar' consistently

   

    // --- REGISTRATION LOGIC ---
    public String userRegister(Account a) {
        if ((a.getEmail() == null || a.getEmail().isEmpty()) ||
            (a.getUsername() == null || a.getUsername().isEmpty()) ||
            (a.getPassword() == null || a.getPassword().isEmpty()) ||
            (a.getRole() == null || a.getRole().isEmpty())) {
            return "All inputs need to fill";
        }

        Account exist = ar.findByEmail(a.getEmail());
        if (exist != null) {
            return "Email already Exists";
        }

        Account exist1 = ar.findByUsername(a.getUsername());
        if (exist1 != null) {
            return "Username already Exists";
        }

        ar.save(a);
        return "Registration Successfull";
    }

    // --- LOGIN LOGIC ---
    public Account userLogin(Account a) {

    Account existing = ar.findByEmail(a.getEmail());

    if (existing != null && existing.getPassword().equals(a.getPassword())) {
        System.out.println("Login Success: " + existing.getUsername() + " as " + existing.getRole());
        return existing;
    }

    System.out.println("Login Failed for email: " + a.getEmail());
    return null;
}

}