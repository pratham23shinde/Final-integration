package com.capstone.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.capstone.application.model.DoctorInfo;


@Repository
public interface DoctorInfoRepo extends JpaRepository<DoctorInfo, String>{
	
	@Query(value="SELECT count(*) FROM doctorinfo WHERE doctor_email=:email",nativeQuery=true)
	int isValuePresent(String email);
}
