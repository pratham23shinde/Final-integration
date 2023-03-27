package com.capstone.application.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.capstone.application.model.Tests;

public interface TestRepo extends JpaRepository<Tests, Integer> {
	
	@Query(value="select * from test where visit_id=?1 " ,nativeQuery=true)
	List<Tests> findTestByVisitId(int visitId);

}
