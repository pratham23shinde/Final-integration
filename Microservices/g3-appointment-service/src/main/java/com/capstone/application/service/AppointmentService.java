package com.capstone.application.service;
import java.util.List;

import com.capstone.application.model.Appointment;
public interface AppointmentService 
{
		Appointment saveAppointment(Appointment appointment);
		public List<Appointment> findByAppointmentById(Integer patientId);
		public List<Appointment> findByAppointmentByPEmail(String physicianEmail,String acceptance);
		public boolean deleteAppointment(Integer appointmentId);
		public List<Appointment> findByAcceptedAppointment(String acceptance);
		public Appointment update(Appointment appointment);
		public List<Appointment> findByAppointmentByPEmailandDate(String physicianEmail, String date, String acceptance);
//		public Appointment findPreviousAppointmentByPatientId(int patientId);
		public List<Integer> findAllAppointmentsByPatientId(int patientId);
		public List<Appointment> findAppointmentsByAppointmentId(int appointmentId);

		//aakash
		void  updateByID(Integer appoitmentId, String status);
		public Appointment findPreviousAppointmentByPatientId(int patientId);

		//Sangeeta
				public long countAppointments();


}
