package com.example.proj1.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.proj1.Model.SubService;

public interface SubserviceRepository extends JpaRepository<SubService, Long> {

    @Query("SELECT s FROM SubService s WHERE s.category.id = :categoryId")
    List<SubService> findByCategoryId(@Param("categoryId") Long categoryId);
}
