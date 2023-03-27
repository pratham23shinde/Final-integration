package com.capstone.application.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.capstone.application.model.AdminInfo;


@Repository
public interface AdminInfoRepo 	extends JpaRepository<AdminInfo,String>{
	

	@Query(value="SELECT count(*) FROM admininfo WHERE admin_email=:email",nativeQuery=true)
	int isValuePresent(String email);

}
