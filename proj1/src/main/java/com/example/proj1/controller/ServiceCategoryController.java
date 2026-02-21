package com.example.proj1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.proj1.Model.ServiceCategory;
import com.example.proj1.Model.SubService;
import com.example.proj1.service.ServiceCategoryService;
import com.example.proj1.service.SubServiceService;

@RestController
@RequestMapping("/Mapping/admin")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class ServiceCategoryController {

    @Autowired
    private ServiceCategoryService categoryService;

    @Autowired
    private SubServiceService subServiceService;

    // ================= CATEGORY =================

    @PostMapping("/category")
    public ServiceCategory addCategory(@RequestBody ServiceCategory category) {
        return categoryService.saveCategory(category);
    }

    @GetMapping("/categories")
    public List<ServiceCategory> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/category/{id}")
    public ServiceCategory getCategory(@PathVariable Long id) {
        return categoryService.getCategoryById(id);
    }

    @PutMapping("/category/{id}")
    public ServiceCategory updateCategory(
            @PathVariable Long id,
            @RequestBody ServiceCategory updated) {

        ServiceCategory category = categoryService.getCategoryById(id);

        if (category != null) {
            category.setCatname(updated.getCatname());
            category.setImageUrl(updated.getImageUrl());
            return categoryService.saveCategory(category);
        }

        throw new RuntimeException("Category not found");
    }

    @DeleteMapping("/category/{id}")
    public String deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return "Category deleted successfully";
    }

    // ================= SUBCATEGORY =================

    // ⭐ Add subcategory under category
    @PostMapping("/subcategory/{categoryId}")
    public SubService addSubCategory(
            @PathVariable Long categoryId,
            @RequestBody SubService subService) {

        return subServiceService.addSubService(categoryId, subService);
    }

    @GetMapping("/subcategories")
    public List<SubService> getAllSubCategories() {
        return subServiceService.getAllSubServices();
    }

    @GetMapping("/subcategory/category/{categoryId}")
    public List<SubService> getSubCategoriesByCategory(
            @PathVariable Long categoryId) {

        return subServiceService.getByCategoryId(categoryId);
    }

   @PutMapping("/subcategory/{id}")
public SubService updateSubCategory(
        @PathVariable Long id,
        @RequestBody SubService updated) {

    SubService sub = subServiceService.getSubServiceById(id);

    if (sub == null) {
        throw new RuntimeException("Subcategory not found");
    }

    sub.setName(updated.getName());
    sub.setImageUrl(updated.getImageUrl());

    return subServiceService.updateSubService(sub);
}

    @DeleteMapping("/subcategory/{id}")
    public String deleteSubCategory(@PathVariable Long id) {
        subServiceService.deleteSubService(id);
        return "Subcategory deleted successfully";
    }
}