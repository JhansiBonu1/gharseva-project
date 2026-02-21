package com.example.proj1.controller;
import java.util.Map;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.proj1.Model.Details;
import com.example.proj1.Model.ServiceCategory;
import com.example.proj1.Model.SubService;
import com.example.proj1.Model.Worker;
import com.example.proj1.service.Adminservice;

@RestController
@RequestMapping("/admin")
@CrossOrigin(
    origins = "http://localhost:5173", 
    allowCredentials = "true",
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS}
)
public class AdminController {

    @Autowired
    private Adminservice service;

    // --- SERVICE DISCOVERY ENDPOINTS (For User Flow) ---

    @GetMapping("/all-categories")
    public ResponseEntity<List<ServiceCategory>> getAllCategories() {
        List<ServiceCategory> categories = service.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/subservices/{catId}")
    public ResponseEntity<List<SubService>> getSubByCat(@PathVariable Long catId) {
        List<SubService> subServices = service.getSubServicesByCategoryId(catId);
        return ResponseEntity.ok(subServices);
    }

    @GetMapping("/workers/skill/{skill}")
    public ResponseEntity<List<Worker>> getWorkersBySkill(@PathVariable String skill) {
        List<Worker> workers = service.getAvailableWorkersBySkill(skill);
        return ResponseEntity.ok(workers);
    }

    // --- ADMIN MANAGEMENT ENDPOINTS ---

    @GetMapping("/all")
    public ResponseEntity<List<Worker>> getAllWorks() {
        // Changed List<?> to List<Worker> for better type safety
        List<Worker> allWorks = service.getAllAssignedWorks(); 
        return ResponseEntity.ok(allWorks);
    }

    @PostMapping("/add-category")
    public ResponseEntity<?> addCategory(@RequestBody ServiceCategory category) {
        ServiceCategory saved = service.addService(category);
        if (saved == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing or invalid category data");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PostMapping("/add-subservice")
    public ResponseEntity<?> addSubService(@RequestBody SubService subService) {
        SubService saved = service.addSubService(subService);
        if (saved == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid subcategory or category ID");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/update-category/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody ServiceCategory updatedCat) {
        ServiceCategory updated = service.updateCategory(id, updatedCat);
        if (updated == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found with ID: " + id);
        }
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/update-subservice/{id}")
    public ResponseEntity<?> updateSubService(@PathVariable Long id, @RequestBody SubService updatedSub) {
        SubService result = service.updateSubService(id, updatedSub);
        if (result == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("SubService not found");
        }
        return ResponseEntity.ok(result);
    }

    @GetMapping("/workers")
    public ResponseEntity<List<Worker>> getAllWorkers() {
        return ResponseEntity.ok(service.getAllWorkers());
    }

    @PutMapping("/update-worker/{id}")
    public ResponseEntity<Worker> updateWorker(@PathVariable Long id, @RequestBody Worker updated) {
        Worker worker = service.updateWorker(id, updated);
        return ResponseEntity.ok(worker);
    }

    @DeleteMapping("/delete-worker/{id}")
    public ResponseEntity<String> deleteWorker(@PathVariable Long id) {
        service.deleteWorker(id);
        return ResponseEntity.ok("Worker deleted successfully");
    }

@GetMapping("/stats")
public ResponseEntity<?> getAdminStats() {

    long totalWorkers = service.countWorkers();
    long activeWorkers = service.countActiveWorkers();
    long totalCategories = service.countCategories();
    long totalSubServices = service.countSubServices();

    return ResponseEntity.ok(
        Map.of(
            "totalWorkers", totalWorkers,
            "activeWorkers", activeWorkers,
            "totalCategories", totalCategories,
            "totalSubServices", totalSubServices
        )
    );
}
@PutMapping("/toggle-worker/{id}")
public ResponseEntity<?> toggleWorker(@PathVariable Long id) {

    Worker worker = service.getWorkerById(id);

    if (worker == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Worker not found");
    }

    worker.setActive(!worker.getActive());
    Worker updated = service.saveWorker(worker);

    return ResponseEntity.ok(updated);
}

@GetMapping("/all-details")
public List<Details> getAllDetails() {
    return service.getAllDetails();
}



}