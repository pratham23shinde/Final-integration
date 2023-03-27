package com.capstone.application.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.capstone.application.model.Prescription;

public interface PrescriptionRepo extends JpaRepository<Prescription, Integer>{
	
	
	@Query(value="select * from prescription where visit_id=:visitId " ,nativeQuery=true)
	List<Prescription> findPrescriptionByVisitId(Integer visitId);

}
