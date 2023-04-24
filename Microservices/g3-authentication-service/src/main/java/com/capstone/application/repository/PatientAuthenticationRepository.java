package com.capstone.application.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capstone.application.model.Patient;

public interface PatientAuthenticationRepository extends JpaRepository<Patient,Integer> {

	@Query(value = "SELECT * from patient where email=:email and password=:password", nativeQuery=true)
	Optional<Patient> authenticateByEmailandPassword(@Param(value="email") String email,@Param(value="password") String password);
	
	@Modifying
	@Query(value="update patient set password=:password where email=:email",nativeQuery=true)
	void updatePassword(@Param(value="email") String email,@Param(value="password") String password);

	
	@Query(value="SELECT email from patient where email=?1",nativeQuery=true)
	String existEmail(String email);

}
