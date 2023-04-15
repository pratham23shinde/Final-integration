package com.capstone.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstone.application.model.PhysicianAvailabiityModel;

@Repository
public interface PhysicianAvailabilityRepository extends JpaRepository<PhysicianAvailabiityModel, String>{
	
	@Query(value="SELECT count(*) FROM physician_availability WHERE physician_email=:email",nativeQuery=true)
	int isValuePresent(@Param("email") String email);

}
