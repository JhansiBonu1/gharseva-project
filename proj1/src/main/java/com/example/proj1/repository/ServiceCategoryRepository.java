package com.example.proj1.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.proj1.Model.ServiceCategory;

public interface ServiceCategoryRepository extends JpaRepository<ServiceCategory, Long> {

    ServiceCategory findByCatname(String catname);
}
