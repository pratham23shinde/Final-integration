package com.capstone.application.service.impl;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.capstone.application.controller.AppointmentController;
import com.capstone.application.exception.AppointmentServiceException;
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
	public List<Integer> findAllAppointmentsByPatientId(int patientId) throws AppointmentServiceException {
		List<Integer> result = appointmentRepository.findAllAppointmentsByPatientId(patientId);
		if(result.isEmpty()) {
			throw new AppointmentServiceException("No Appointments found with Patient Id "+ patientId);
		}
		return result;
	}
	
	@Override
	public List<Appointment> findAppointmentsByAppointmentId(int appointmentId) throws AppointmentServiceException {
		
		List<Appointment> result = appointmentRepository.findAppointmentByAppointmentId(appointmentId);
		if(result.isEmpty()) {
			throw new AppointmentServiceException("No Appointments found with Appointment Id "+ appointmentId);
		}
		else {
		return result;
		}
	}
	
	
	@Override
	public List<Appointment> findByAppointmentById(Integer patientId) throws AppointmentServiceException {
		
		 List<Appointment> result = appointmentRepository.findByPatientId(patientId);
		
		 if(result.isEmpty()) {
				throw new AppointmentServiceException("No Appointments found with Patient Id "+ patientId);
		 }
		 return result;
	}

	@Override
	public List<Appointment> findByAppointmentByPEmail(String physicianEmail,String acceptance)  throws AppointmentServiceException{
		List<Appointment> result =  appointmentRepository.findByEmail(physicianEmail,acceptance);
		 if (result.isEmpty()) {
				throw new AppointmentServiceException("No Appointments found with Email Id "+ physicianEmail);
		 }
		 return result;
	}

	@Override
	public boolean deleteAppointment(Integer appointmentId) throws AppointmentServiceException{
		
		Optional<Appointment> appointment = appointmentRepository.findById(appointmentId);
		if( appointment.isEmpty() ) {
			throw new AppointmentServiceException("No Appointment found with Id "+ appointmentId);
		}
		appointmentRepository.deleteById(appointmentId);
		return true;
	}

	@Override
	public List<Appointment> findByAcceptedAppointment(String acceptance) throws AppointmentServiceException{
		List<Appointment> result = appointmentRepository.findByAcceptance(acceptance);
		
		if (result.isEmpty()) {
			throw new AppointmentServiceException("No Appointments found");
	 }
	 return result;
		
	}

	@Override
	public Appointment update(Appointment appointment) throws AppointmentServiceException {
		
		Appointment updateResponse = appointmentRepository.save(appointment);
		if(updateResponse==null) {
			throw new AppointmentServiceException("Appoinment details are invalid or null");
		}
        return updateResponse;
	}

	@Override
	public List<Appointment> findByAppointmentByPEmailandDate(String physicianEmail, String date, String acceptance) throws AppointmentServiceException {
		List<Appointment> result = appointmentRepository.findByEmailandDate(physicianEmail, date, acceptance);
		
		if (result.isEmpty()) {
			throw new AppointmentServiceException("No Appointments found with Email Id "+ physicianEmail + "and Date "+ date);
	 }
	 return result;
		
		
	}

	@Override
	public Appointment saveAppointment(Appointment appointment) throws AppointmentServiceException {
		
		appointment.setAcceptance("Pending");
		Appointment result = appointmentRepository.save(appointment);
		
		if(result == null) {
			throw new AppointmentServiceException("Appoinment details are invalid or null");
		}
		return result;
	}

	//Aakash solanke
	@Override
	public void updateByID(Integer appoitmentId, String status) throws AppointmentServiceException {
		
		Optional<Appointment> appointment = appointmentRepository.findById(appoitmentId);
		if( appointment.isEmpty() ) {
			throw new AppointmentServiceException("No Appointment found with Id "+ appoitmentId);
		}
		appointmentRepository.update(appoitmentId, status);
		
	
	}
	
	@Override
	public Appointment findPreviousAppointmentByPatientId(int patientId) throws AppointmentServiceException{
		List<Appointment> patient = appointmentRepository.findByPatientId(patientId);
		if( patient.isEmpty() ) {
			throw new AppointmentServiceException("No Patient found with patient Id "+ patientId);
		}
		
		 System.out.println(appointmentRepository.findPreviousAppointmentById(patientId));
		 return appointmentRepository.findPreviousAppointmentById(patientId);
	}

	//Sangeeta
		@Override
		public long countAppointments() {
			
			return appointmentRepository.count();
		}
	
		//gaytri
		@Override
		public List<Appointment> findAppointmentByDate(String date, String acceptance) throws AppointmentServiceException {
			// TODO Auto-generated method stub
			
			List<Appointment> result = appointmentRepository.findByDateAndAcceptance( date, acceptance);
			
			if(result.isEmpty()) {
				throw new AppointmentServiceException("No Appointments found on "+ date);
			}
			return result;
			
		}
}
