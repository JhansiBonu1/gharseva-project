package com.example.proj1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.proj1.Model.Account;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    
    // Standard JPA findById returns Optional<Account>
    Optional<Account> findById(Long id);

    Account findByEmail(String email);
    Account findByUsername(String username);
}