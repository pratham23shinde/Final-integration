package com.capstone.application.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.capstone.application.model.Allergy;

public interface AllergyRepository extends JpaRepository<Allergy,Integer> {

}
