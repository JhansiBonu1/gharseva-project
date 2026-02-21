package com.example.proj1.service;

import java.util.List;
import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.proj1.Model.Details;
import com.example.proj1.Model.ServiceCategory;
import com.example.proj1.Model.SubService;
import com.example.proj1.Model.Worker;
import com.example.proj1.repository.DetailsRepository;
import com.example.proj1.repository.ServiceCategoryRepository;
import com.example.proj1.repository.SubserviceRepository;
import com.example.proj1.repository.WorkerRepository;

@Service
public class Adminservice {

    @Autowired
    private ServiceCategoryRepository serviceRepo;

    @Autowired
    private SubserviceRepository subRepo;

    @Autowired
    private WorkerRepository workerRepo;

    // --- CATEGORY LOGIC ---

    // Added this method to fix the Controller error
    public List<ServiceCategory> getAllCategories() {
        return serviceRepo.findAll();
    }
    @Autowired
private DetailsRepository detailsRepository;

public List<Details> getAllDetails() {
    return detailsRepository.findAll();
}


    public ServiceCategory addService(ServiceCategory sc) {
        if (sc.getCatname() == null || sc.getCatname().trim().isEmpty()
            || sc.getImageUrl() == null || sc.getImageUrl().trim().isEmpty()) {
            return null;
        }

        ServiceCategory existing = serviceRepo.findByCatname(sc.getCatname());
        if (existing != null) {
            return null; 
        }
        return serviceRepo.save(sc);
    }

    public ServiceCategory updateCategory(Long id, ServiceCategory updatedCat) {
        return serviceRepo.findById(id).map(existing -> {
            existing.setCatname(updatedCat.getCatname());
            existing.setImageUrl(updatedCat.getImageUrl());
            return serviceRepo.save(existing);
        }).orElse(null);
    }

    // --- SUB-SERVICE LOGIC ---

    // Added this method to fix the Controller error
    public List<SubService> getSubServicesByCategoryId(Long catId) {
        return subRepo.findByCategoryId(catId);
    }

    public SubService addSubService(SubService ss) {
        if (ss.getName() == null || ss.getCategory() == null || ss.getCategory().getId() == null) {
            return null;
        }

        Long categoryId = ss.getCategory().getId();
        ServiceCategory category = serviceRepo.findById(categoryId).orElse(null);

        if (category == null) return null;

        List<SubService> existingSubs = subRepo.findByCategoryId(category.getId());
        for (SubService s : existingSubs) {
            if (s.getName().equalsIgnoreCase(ss.getName())) {
                return null;
            }
        }

        ss.setCategory(category);
        return subRepo.save(ss);
    }

    public SubService updateSubService(Long id, SubService updatedSub) {
        return subRepo.findById(id).map(existing -> {
            existing.setName(updatedSub.getName());
            existing.setImageUrl(updatedSub.getImageUrl());
            return subRepo.save(existing);
        }).orElse(null);
    }

    // --- WORKER MANAGEMENT LOGIC ---

    // Added this method to fix the Controller error
    public List<Worker> getAvailableWorkersBySkill(String skill) {
        return workerRepo.findBySkillIgnoreCaseAndAvailableTrue(skill);
    }

    public List<Worker> getAllWorkers() {
        return workerRepo.findAll();
    }

    public Worker updateWorker(Long id, Worker updated) {
        return workerRepo.findById(id).map(w -> {
            w.setUsername(updated.getUsername());
          //  w.setPhone(updated.getPhone());
            w.setLocation(updated.getLocation());
            // It's good practice to ensure skill/availability are updatable too
            if(updated.getSkill() != null) w.setSkill(updated.getSkill());
            return workerRepo.save(w);
        }).orElse(null);
    }

    public void deleteWorker(Long id) {
        if (workerRepo.existsById(id)) {
            workerRepo.deleteById(id);
        }
    }

    public List<Worker> getAllAssignedWorks() {
        try {
            List<Worker> workers = workerRepo.findAll();
            return (workers != null) ? workers : new ArrayList<>();
        } catch (Exception e) {
            System.err.println("Error fetching assigned works: " + e.getMessage());
            return new ArrayList<>(); 
        }
    }

    // --- ADDITIONAL ADMIN POWER METHODS ---

public Worker getWorkerById(Long id) {
    return workerRepo.findById(id).orElse(null);
}

public Worker saveWorker(Worker worker) {
    return workerRepo.save(worker);
}

public long countWorkers() {
    return workerRepo.count();
}

public long countActiveWorkers() {
    return workerRepo.findAll()
                     .stream()
                     .filter(Worker::getActive)
                     .count();
}

public long countCategories() {
    return serviceRepo.count();
}

public long countSubServices() {
    return subRepo.count();
}

}