package com.capstone.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.capstone.application.model.NurseInfo;


@Repository
public interface NurseInfoRepo extends JpaRepository<NurseInfo,String>{

	@Query(value="SELECT count(*) FROM nurseinfo WHERE nurse_email=:email",nativeQuery=true)
	int isValuePresent(String email);
	
	

}
