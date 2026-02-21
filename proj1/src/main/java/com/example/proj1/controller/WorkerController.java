package com.example.proj1.controller;

import com.example.proj1.Model.Details;
import com.example.proj1.Model.Worker;
import com.example.proj1.service.DetailsService;
import com.example.proj1.service.WorkerService;
import com.example.proj1.service.EmailService;
import com.example.proj1.util.OTPUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/wkdb")
public class WorkerController {

    @Autowired
    private WorkerService workerService;

    @Autowired
    private DetailsService ds;

    @Autowired
    private OTPUtil otpUtil;

    @Autowired
    private EmailService emailService;

    // ✅ ADD WORKER (Admin creates worker)
    @PostMapping("/worker")
    public ResponseEntity<?> addWorker(@RequestBody Worker w) {

        String result = workerService.createWorker(w);

        if (result.equals("Worker Created Successfully")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
        }
    }

    // ✅ GET ALL WORKERS
    @GetMapping("/workers")
    public ResponseEntity<List<Worker>> getAllWorkers() {
        List<Worker> workers = workerService.getAllWorkers();
        return ResponseEntity.ok(workers);
    }

    // ✅ GET WORKER BY ID
    @GetMapping("/details/{id}")
    public ResponseEntity<?> getWorkerDetails(@PathVariable Long id) {

        Worker worker = workerService.getWorkerById(id);

        if (worker == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Worker not found");
        }

        return ResponseEntity.ok(worker);
    }

    // ✅ UPDATE WORKER
    @PutMapping("/update-worker/{id}")
    public ResponseEntity<?> updateWorker(@PathVariable Long id,
                                          @RequestBody Worker updated) {

        Worker worker = workerService.getWorkerById(id);

        if (worker == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Worker not found");
        }

        worker.setUsername(updated.getUsername());
        worker.setEmail(updated.getEmail());
        worker.setLocation(updated.getLocation());
        worker.setSkill(updated.getSkill());
        worker.setAvailable(updated.getAvailable());
        worker.setActive(updated.getActive());

        return ResponseEntity.ok(workerService.updateWorker(id, updated));
    }

    // ✅ DELETE WORKER
    @DeleteMapping("/delete-worker/{id}")
    public ResponseEntity<?> deleteWorker(@PathVariable Long id) {

        String result = workerService.deleteWorker(id);

        if (result.equals("Worker Deleted Successfully")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result);
        }
    }

    // 🔎 SEARCH WORKERS BY SKILL
    @GetMapping("/search/skill")
    public ResponseEntity<List<Worker>> searchWorkersBySkill(
            @RequestParam String skill) {

        return ResponseEntity.ok(workerService.findAvailableBySkill(skill));
    }

    // 🔐 GENERATE OTP FOR WORKER
    @PutMapping("/generate-otp/{id}")
    public ResponseEntity<String> generateOtp(@PathVariable Long id) {

        Details d = ds.getById(id);

        if (d == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Booking not found");
        }

        String otp = otpUtil.generateOTP();
        d.setOtp(otp);
        d.setOtpVerified(false);
        ds.saveDetails(d);

        // Send OTP to worker email
        emailService.sendOTP(d.getWorkerEmail(), otp);

        return ResponseEntity.ok("OTP sent successfully to worker email");
    }
}