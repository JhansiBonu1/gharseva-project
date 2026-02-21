package com.example.proj1.repository;

import com.example.proj1.Model.Details;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;


public interface DetailsRepository extends JpaRepository<Details, Long> {
    List<Details> findByUserEmail(String userEmail);       // For user's past works
    List<Details> findByWorkerEmail(String workerEmail);   // For worker's assigned works
    List<Details> findAllByOrderByDateTimeDesc();

List<Details> findByWorkStatus(String status);

List<Details> findByMoneyStatus(String moneyStatus);

long countByCompletedTrue();

long countByCancelledTrue();

    
}
