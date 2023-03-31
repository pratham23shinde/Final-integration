package com.capstone.application.service;
import java.util.List;

import com.capstone.application.exception.AppointmentServiceException;
import com.capstone.application.model.Appointment;
public interface AppointmentService 
{
		Appointment saveAppointment(Appointment appointment) throws AppointmentServiceException;
		public List<Appointment> findByAppointmentById(Integer patientId) throws AppointmentServiceException;
		public List<Appointment> findByAppointmentByPEmail(String physicianEmail,String acceptance) throws AppointmentServiceException;
		public boolean deleteAppointment(Integer appointmentId) throws AppointmentServiceException;
		public List<Appointment> findByAcceptedAppointment(String acceptance) throws AppointmentServiceException;
		public Appointment update(Appointment appointment) throws AppointmentServiceException;
		public List<Appointment> findByAppointmentByPEmailandDate(String physicianEmail, String date, String acceptance) throws AppointmentServiceException;
//		public Appointment findPreviousAppointmentByPatientId(int patientId);
		public List<Integer> findAllAppointmentsByPatientId(int patientId) throws AppointmentServiceException;
		
		public List<Appointment> findAppointmentsByAppointmentId(int appointmentId) throws AppointmentServiceException;

		//aakash
		void  updateByID(Integer appoitmentId, String status) throws AppointmentServiceException;
		public Appointment findPreviousAppointmentByPatientId(int patientId) throws AppointmentServiceException;

		//Sangeeta
				public long countAppointments();
				
		//gayatri
				public List<Appointment> findAppointmentByDate(String date, String acceptance) throws AppointmentServiceException;		

}
