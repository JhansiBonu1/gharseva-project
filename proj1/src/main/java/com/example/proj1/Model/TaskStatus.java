package com.example.proj1.Model;

public enum TaskStatus {
    PENDING,    // Assigned but not yet accepted
    ACCEPTED,   // Worker accepted and OTP generated
    REJECTED,   // Worker rejected task
    COMPLETED   // OTP verified by user
}