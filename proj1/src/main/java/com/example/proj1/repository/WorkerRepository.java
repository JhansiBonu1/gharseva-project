package com.example.proj1.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.proj1.Model.Account;
import com.example.proj1.Model.Worker;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, Long> {

    Worker findByEmail(String email);

    Worker findByAccount(Account acc);

    List<Worker> findBySkillIgnoreCaseAndAvailableTrue(String skill);
    List<Worker> findBySkillIgnoreCaseAndAvailableTrueAndActiveTrue(String skill);
    List<Worker> findByActiveTrue();
    
    // Check if email exists to prevent 500 errors
    boolean existsByEmail(String email);
    
    // Check if username exists
    boolean existsByUsername(String username);
}