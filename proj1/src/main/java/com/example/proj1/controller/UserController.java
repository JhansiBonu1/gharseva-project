package com.example.proj1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.proj1.Model.Details;
import com.example.proj1.Model.User;
import com.example.proj1.service.DetailsService;
import com.example.proj1.service.UserService;

@RestController
@RequestMapping("/usdb") // Changed to base "/usdb" to avoid conflict with admin
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserService us;

    @Autowired
    private DetailsService ds;

    // ---------------- LOGIN ----------------
    @PostMapping("/user/login")
    public ResponseEntity<?> userLogin(@RequestBody User u) {
        User res = us.userdashbd(u);
        if (res == null) return ResponseEntity.status(HttpStatus.CONFLICT).body("Invalid Credentials");
        return ResponseEntity.ok(res);
    }

    // ---------------- CATEGORIES ----------------
   

    // ---------------- SUBSERVICES ----------------
    

    // ---------------- USER DETAILS ----------------
    @GetMapping("/details/{email}")
    public List<Details> getByUser(@PathVariable String email) {
        return ds.getByUserEmail(email);
    }
}
