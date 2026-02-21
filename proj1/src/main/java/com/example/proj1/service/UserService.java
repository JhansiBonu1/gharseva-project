package com.example.proj1.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.proj1.Model.Account;
import com.example.proj1.Model.ServiceCategory;
import com.example.proj1.Model.SubService;
import com.example.proj1.Model.User;
import com.example.proj1.repository.AccountRepository;
import com.example.proj1.repository.ServiceCategoryRepository;
import com.example.proj1.repository.SubserviceRepository;
import com.example.proj1.repository.UserRepository;

import jakarta.servlet.http.HttpSession;

@Service
public class UserService {

    @Autowired
    private UserRepository ur;

    @Autowired
    private HttpSession session;

    @Autowired
    private AccountRepository ar;

    @Autowired
    private ServiceCategoryRepository sr;

    @Autowired
    private SubserviceRepository ss;

    public User userdashbd(User u) {
        Long id = (Long) session.getAttribute("userid");
        if (id == null) return null;

        Account acc = ar.findById(id).orElse(null);
        if (acc == null) return null;

        User existingUser = ur.findByEmail(acc.getEmail());
        if (existingUser != null) {
            existingUser.setLocation(u.getLocation());
            existingUser.setPhone(u.getPhone());
            existingUser.setDateTime(u.getDateTime());
            return ur.save(existingUser);
        }

        u.setEmail(acc.getEmail());
        u.setAccount(acc);
        u.setUsername(acc.getUsername());
        return ur.save(u);
    }

    public List<ServiceCategory> getAllCategories() {
        return sr.findAll();
    }

    public List<SubService> getSubServicesByCategory(Long categoryId) {
        return ss.findByCategoryId(categoryId);
    }

    public ServiceCategory getCategoryByName(String name) {
        return sr.findByCatname(name);
    }
}
