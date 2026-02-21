package com.example.proj1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.proj1.Model.Account;
import com.example.proj1.Model.User;
@Repository
public interface UserRepository extends JpaRepository<User,Integer>{

    User findByAccount(Account acc);

    User findByEmail(String email);

    
}
