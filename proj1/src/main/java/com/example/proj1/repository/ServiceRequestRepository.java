package com.example.proj1.repository;

import com.example.proj1.Model.ServiceRequest;
import com.example.proj1.Model.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    List<ServiceRequest> findByWorkerId(Long workerId);
    List<ServiceRequest> findByUserIdAndStatus(Long userId, TaskStatus status);
}