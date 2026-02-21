package com.example.proj1.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.proj1.Model.ServiceCategory;
import com.example.proj1.Model.SubService;
import com.example.proj1.repository.ServiceCategoryRepository;
import com.example.proj1.repository.SubserviceRepository;

@Service
public class SubServiceService {

    @Autowired
    private SubserviceRepository subRepo;

    @Autowired
    private ServiceCategoryRepository categoryRepo;

    // ✅ Add SubService under Category
    public SubService addSubService(Long categoryId, SubService subService) {

    ServiceCategory category = categoryRepo.findById(categoryId)
            .orElseThrow(() -> new RuntimeException("Category not found"));

    subService.setCategory(category);

    return subRepo.save(subService);
}

    public List<SubService> getAllSubServices() {
        return subRepo.findAll();
    }

    public SubService getSubServiceById(Long id) {
        return subRepo.findById(id).orElse(null);
    }

    public void deleteSubService(Long id) {
        subRepo.deleteById(id);
    }

    public List<SubService> getByCategoryId(Long categoryId) {
        return subRepo.findByCategoryId(categoryId);
    }

    public SubService updateSubService(SubService subService) {
    return subRepo.save(subService);
}
}

