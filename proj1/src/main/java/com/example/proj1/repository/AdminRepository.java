package com.example.proj1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.proj1.Model.Admin;
@Repository
public interface AdminRepository extends JpaRepository<Admin,Integer>{

}
