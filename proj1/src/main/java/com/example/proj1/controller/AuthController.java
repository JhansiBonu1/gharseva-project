package com.example.proj1.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.proj1.Model.Account;
import com.example.proj1.service.AccountService;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AccountService as;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Account a) {
        String res = as.userRegister(a);

        if ("All inputs need to fill".equals(res)) { // Use equals() instead of ==
            return ResponseEntity.status(HttpStatus.CONFLICT).body(res);
        } else if ("Registration Successfull".equals(res)) {
            return ResponseEntity.ok(res);
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body(res);
    }

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody Account a) {
    Account res = as.userLogin(a);
    if (res == null) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid Credentials");
    }
    
    // Prepare a structured JSON response
    Map<String, Object> response = new HashMap<>();
    response.put("id", res.getId()); // IMPORTANT: Add this so frontend can save 'userid'
    response.put("email", res.getEmail());
    response.put("role", res.getRole());
    response.put("username", res.getUsername()); 
    
    return ResponseEntity.ok(response);
}}