package com.capstone.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import com.capstone.application.model.AdminInfo;

@Repository
public interface AdminInfoRepo extends JpaRepository<AdminInfo, String> {

	@Query(value = "SELECT count(*) FROM admininfo WHERE admin_email=:email", nativeQuery = true)
	int isValuePresent(@Param("email") String email);

	@Query(value = "SELECT * FROM admininfo WHERE admin_email=:email", nativeQuery = true)
	public AdminInfo findAdminDetails(@Param("email") @PathVariable("email") String email);

}
