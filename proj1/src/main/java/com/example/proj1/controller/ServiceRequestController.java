package com.example.proj1.controller;

import com.example.proj1.service.ServiceRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/wkdb/tasks")
public class ServiceRequestController {

    @Autowired
    private ServiceRequestService service;

    // Worker Accept/Reject
    @PostMapping("/worker/{workerId}/task/{taskId}/status")
    public ResponseEntity<?> updateTaskStatus(
            @PathVariable Long workerId,
            @PathVariable Long taskId,
            @RequestParam String action) {

        String result = service.updateTaskStatus(workerId, taskId, action);
        return ResponseEntity.ok(result);
    }

    // User OTP Verification
    @PostMapping("/task/{taskId}/verify-otp")
    public ResponseEntity<?> verifyOtp(
            @PathVariable Long taskId,
            @RequestParam String otp) {

        String result = service.verifyOtp(taskId, otp);
        return ResponseEntity.ok(result);
    }
}