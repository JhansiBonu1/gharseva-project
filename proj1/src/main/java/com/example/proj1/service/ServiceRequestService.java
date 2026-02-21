package com.example.proj1.service;

import com.example.proj1.Model.ServiceRequest;
import com.example.proj1.Model.TaskStatus;
import com.example.proj1.repository.ServiceRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Random;

@Service
public class ServiceRequestService {

    @Autowired
    private ServiceRequestRepository serviceRequestRepo;

    // Worker Accept / Reject
    public String updateTaskStatus(Long workerId, Long taskId, String action) {
        ServiceRequest task = serviceRequestRepo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getWorker().getId().equals(workerId)) {
            return "Unauthorized action";
        }

        if ("accept".equalsIgnoreCase(action)) {
    task.setStatus(TaskStatus.ACCEPTED);
    String otp = generateOTP();
    task.setOtp(otp);
    serviceRequestRepo.save(task);
    
    System.out.println("Generated OTP for task " + task.getId() + ": " + otp); // 🔥
    return "Task Accepted. OTP generated: " + task.getOtp();
        }
         else if ("reject".equalsIgnoreCase(action)) {
            task.setStatus(TaskStatus.REJECTED);
            serviceRequestRepo.save(task);
            return "Task Rejected";
        } else {
            return "Invalid action";
        }
    }

    // OTP Verification by User
    public String verifyOtp(Long taskId, String otp) {
        ServiceRequest task = serviceRequestRepo.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (task.getOtp() != null && task.getOtp().equals(otp)) {
            task.setStatus(TaskStatus.COMPLETED);
            serviceRequestRepo.save(task);
            return "OTP verified. Task Completed!";
        } else {
            return "Invalid OTP";
        }
    }

    private String generateOTP() {
        int otp = 100000 + new Random().nextInt(900000);
        return String.valueOf(otp);
    }
}