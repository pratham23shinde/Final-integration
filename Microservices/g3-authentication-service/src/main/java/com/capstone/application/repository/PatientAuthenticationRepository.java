package com.capstone.application.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.capstone.application.model.Patient;

public interface PatientAuthenticationRepository extends JpaRepository<Patient,Integer> {

	@Query(value = "SELECT * from Patient where email=?1 and password=?2", nativeQuery=true)
	Optional<Patient> authenticateByEmailandPassword(String email, String password);

}
