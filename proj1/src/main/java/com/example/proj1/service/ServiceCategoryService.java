package com.example.proj1.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.proj1.Model.ServiceCategory;
import com.example.proj1.repository.ServiceCategoryRepository;

@Service
public class ServiceCategoryService {

    @Autowired
    private ServiceCategoryRepository categoryRepo;

    public ServiceCategory saveCategory(ServiceCategory category) {
        return categoryRepo.save(category);
    }

    public List<ServiceCategory> getAllCategories() {
        return categoryRepo.findAll();
    }

    public ServiceCategory getCategoryById(Long id) {
        return categoryRepo.findById(id).orElse(null);
    }

    public void deleteCategory(Long id) {
        categoryRepo.deleteById(id);
    }

    public ServiceCategory getCategoryByName(String name) {
        return categoryRepo.findByCatname(name);
    }
}
