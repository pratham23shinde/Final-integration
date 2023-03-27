package com.capstone.application.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capstone.application.model.VisitDetails;

public interface PatietHealthRecordsRepository extends JpaRepository<VisitDetails,Integer> {
	
	@Query(value="select visit_id from visit_details where patient_id=?1", nativeQuery=true)
	List<Integer> findVisitIdByPatientId(int patientId);

	
	//aakash
	@Query(value = "Select * from visit_details  where patient_id=:id order by visit_id desc limit 1,1", nativeQuery =true)
	public VisitDetails  getPreviousVisitIdDetailsById(@Param(value="id") Integer id)	;

	@Query(value="Select * from visit_details where appointment_id=:id", nativeQuery =true)
	 public VisitDetails findVisitDetailsById(@Param(value = "id") Integer id);
	
	
}
