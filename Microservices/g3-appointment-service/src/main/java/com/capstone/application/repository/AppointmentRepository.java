package com.capstone.application.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.capstone.application.model.Appointment;


public interface AppointmentRepository extends JpaRepository<Appointment,Integer>{

	@Query(value = "SELECT * from appointment where physician_email=?1 and acceptance=?2", nativeQuery=true)
	List<Appointment> findByEmail(String physicianEmail,String acceptance);

	@Query(value = "SELECT * from appointment where acceptance=?1", nativeQuery=true)
	List<Appointment> findByAcceptance(String acceptance);

	@Query(value = "SELECT * from appointment where physician_email=?1 and date=?2 and acceptance=?3", nativeQuery=true)
	List<Appointment> findByEmailandDate(String physicianEmail, String date, String acceptance);

//	 @Query(value = "select * from appointment where patient_id =?1 and date < now() limit 1" ,nativeQuery=true)
//	 Appointment findPreviousAppointmentById(int patientId);

	 @Query(value = "select * from appointment where patient_id=:patientId order by date desc" ,nativeQuery=true)
	 List<Appointment> findByPatientId(Integer patientId);
	 
	 @Query(value = "select appointment_id from appointment where patient_id =?1",nativeQuery=true)
		List findAllAppointmentsByPatientId(int patientId);
		
		@Query(value = "select * from appointment where appointment_id=?1",nativeQuery=true)
		List<Appointment> findAppointmentByAppointmentId(int appointment);

		//aakash solanke
		@Modifying
		@Query(value="update appointment set acceptance=:status where appointment_id=:id",nativeQuery = true)
		void update(@Param(value = "id") Integer id,@Param(value = "status") String status);
		
		@Query(value = "select * from appointment where patient_id=:id and acceptance='Accepted' order by appointment_id desc limit 1" ,nativeQuery=true)
		public Appointment findPreviousAppointmentById(@Param(value="id") Integer id);
		
		@Query(value = "select * from appointment where patient_id=:id and acceptance='Accepted' order by appointment_id desc limit 1,1" ,nativeQuery=true)
		public Appointment findPreviousAppointmentforNurseDoctor(@Param(value="id") Integer id);

		//gaytri
		@Query(value = "SELECT * from appointment where  date=?1 and acceptance=?2", nativeQuery=true)
		List<Appointment> findByDateAndAcceptance( String date, String acceptance);
}
