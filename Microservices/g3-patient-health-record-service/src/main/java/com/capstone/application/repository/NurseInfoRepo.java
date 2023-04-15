package com.capstone.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.capstone.application.model.NurseInfo;

@Repository
public interface NurseInfoRepo extends JpaRepository<NurseInfo, String> {

	@Query(value = "SELECT count(*) FROM nurseinfo WHERE nurse_email=:email", nativeQuery = true)
	int isValuePresent(@Param("email") String email);

	// gayu
	@Query(value = "select * from nurseinfo where nurse_email=?1", nativeQuery = true)
	public NurseInfo getNurseInfoByEmail(String nurse_email);

}
