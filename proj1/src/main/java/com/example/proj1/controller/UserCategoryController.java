package com.example.proj1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.proj1.Model.ServiceCategory;
import com.example.proj1.Model.SubService;
import com.example.proj1.service.ServiceCategoryService;
import com.example.proj1.service.SubServiceService;

@RestController
@RequestMapping("/usdb")
@CrossOrigin(origins = "http://localhost:5173")
public class UserCategoryController {

    @Autowired
    private ServiceCategoryService categoryService;

    @Autowired
    private SubServiceService subServiceService;

    @GetMapping("/categories")
    public List<ServiceCategory> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/subservices/{categoryId}")
    public List<SubService> getSubServicesByCategory(@PathVariable Long categoryId) {
        return subServiceService.getByCategoryId(categoryId);
    }
}
