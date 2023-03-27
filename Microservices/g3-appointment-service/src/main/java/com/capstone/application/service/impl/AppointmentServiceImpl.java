package com.capstone.application.service.impl;
import java.util.List;

import org.springframework.stereotype.Service;

import com.capstone.application.controller.AppointmentController;
import com.capstone.application.model.Appointment;
import com.capstone.application.repository.AppointmentRepository;
import com.capstone.application.service.AppointmentService;

import lombok.extern.log4j.Log4j2;



@Service
@Log4j2
public class AppointmentServiceImpl implements AppointmentService{
	private static final org.apache.logging.log4j.Logger log = org.apache.logging.log4j.LogManager.getLogger(AppointmentController.class);

	private AppointmentRepository appointmentRepository;

	public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
		super();
		this.appointmentRepository = appointmentRepository;
	}

	@Override
	public List<Integer> findAllAppointmentsByPatientId(int patientId) {
		try {
			log.info("Appointment list fetched successfully");
		return appointmentRepository.findAllAppointmentsByPatientId(patientId);
		}
		catch(Exception e)
		{
			 e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}
	
	@Override
	public List<Appointment> findAppointmentsByAppointmentId(int appointmentId) {
		try {
			log.info("Appointment fetched by appointmentId successfully");
		return appointmentRepository.findAppointmentByAppointmentId(appointmentId);
		}
		catch(Exception e)
		{
			 e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}
	
//	@Override
//	public Appointment findPreviousAppointmentByPatientId(int patientId) {
//	// TODO Auto-generated method stub
//		try {
//			log.info("Previous appointment fetched successfully");
//	return appointmentRepository.findPreviousAppointmentById(patientId);
//		}
//		catch(Exception e)
//		{
//			 e.printStackTrace();
//			log.error(e.getMessage());
//		}
//		return null;
//	}
	
	
	@Override
	public List<Appointment> findByAppointmentById(Integer patientId) {
		// TODO Auto-generated method stub
		
		try {
			log.info("Appointment fetched by patientId successfully");
		return appointmentRepository.findByPatientId(patientId);
		}
		catch(Exception e)
		{
			 e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public List<Appointment> findByAppointmentByPEmail(String physicianEmail,String acceptance) {
		// TODO Auto-generated method stub
		try {
			log.info("Appointment fetched by physician email successfully");
		return appointmentRepository.findByEmail(physicianEmail,acceptance);
		}
		catch(Exception e)
		{
			 e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public boolean deleteAppointment(Integer appointmentId) {
		// TODO Auto-generated method stub
		try {
			log.info("Appointment deleted successfully");
		appointmentRepository.deleteById(appointmentId);
		return true;
		}
		catch(Exception e)
		{
			 e.printStackTrace();
			log.error(e.getMessage());
		}
		return false;
	}

	@Override
	public List<Appointment> findByAcceptedAppointment(String acceptance) {
		// TODO Auto-generated method stub
		try {
			log.info("Accepted appointment fetched successfully");
		return appointmentRepository.findByAcceptance(acceptance);
		}
		catch(Exception e)
		{
			 e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Appointment update(Appointment appointment) {
		// TODO Auto-generated method stub
		Appointment updateResponse = appointmentRepository.save(appointment);
        return updateResponse;
	}

	@Override
	public List<Appointment> findByAppointmentByPEmailandDate(String physicianEmail, String date, String acceptance) {
		// TODO Auto-generated method stub
		try {
			log.info("Appointment fectched ny physicaian email and date");
		return appointmentRepository.findByEmailandDate(physicianEmail, date, acceptance);
		}
		catch(Exception e)
		{
			 e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Appointment saveAppointment(Appointment appointment) {
		// TODO Auto-generated method stub
		try {
			log.info("Apppointment Booked successfully");
		appointment.setAcceptance("Pending");
		return appointmentRepository.save(appointment);
		}
		catch(Exception e)
		{
			 e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	//Aakash solanke
	@Override
	public void updateByID(Integer appoitmentId, String status) {
		try {
			appointmentRepository.update(appoitmentId, status);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			log.error(e.getMessage());
		}
	}
	
	@Override
	public Appointment findPreviousAppointmentByPatientId(int patientId) {
	// TODO Auto-generated method stub
		 System.out.println(appointmentRepository.findPreviousAppointmentById(patientId));
	return appointmentRepository.findPreviousAppointmentById(patientId);
	}

	
}
