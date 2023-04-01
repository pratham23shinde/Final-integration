package com.capstone.application;

import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.capstone.application.exception.AppointmentServiceException;
import com.capstone.application.model.Appointment;
import com.capstone.application.repository.AppointmentRepository;
import com.capstone.application.service.impl.AppointmentServiceImpl;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class AppointmentApplicationTests {

	@Mock private AppointmentRepository appointmentRepo;
	private AppointmentServiceImpl appointmentService;
	
	@BeforeEach void setup()
	{
		this.appointmentService=new AppointmentServiceImpl(this.appointmentRepo);
	}
	
	@Test
	void getAllAppointments() throws AppointmentServiceException {
		appointmentService.findAppointmentsByAppointmentId(1);
		verify(appointmentRepo).findAppointmentByAppointmentId(1);
	}
	
	@Test
	
	void getAppointmentByPatientId() throws AppointmentServiceException {
		appointmentService.findByAppointmentById(1);
		verify(appointmentRepo).findByPatientId(1);
	}
	
	@Test
	void getAppointmentByEmail() throws AppointmentServiceException {
		appointmentService.findByAppointmentByPEmail("krunal.zodape@gmail.com","Accepted");
		verify(appointmentRepo).findByEmail("krunal.zodape@gmail.com", "Accepted");
	}
	
	@Test
	void deleteAppointment() throws AppointmentServiceException {
		appointmentService.deleteAppointment(1);
		verify(appointmentRepo).deleteById(1);
	}
	
	@Test
	void getAcceptedAppointements() throws AppointmentServiceException {
		appointmentService.findByAcceptedAppointment("Accepted");
		verify(appointmentRepo).findByAcceptance("Accepted");
	}
	
	@Test
	void getAppointementByEmailandDate() throws AppointmentServiceException
	{
		appointmentService.findByAppointmentByPEmailandDate("krunal.zodape@gmail.com", "02-04-2023", "Accepted");
		verify(appointmentRepo).findByEmailandDate("krunal.zodape@gmail.com", "02-04-2023", "Accepted");
	}
	
	@Test
	void createAppointment() throws AppointmentServiceException {
		Appointment appointment =new Appointment();
		appointment.setDrFirstName("Krunal");
		appointment.setDrLastName("Zodape");
		appointment.setReason("Head");
		appointment.setDate("02-04-2023");
		appointment.setPatientId(1);
		appointment.setPhysicianEmail("krunal.zodape@gmail.com");
		appointment.setAcceptance("Pending");
		appointment.setSubmissionDate("31-03-2023");
		appointmentService.saveAppointment(appointment);
		verify(appointmentRepo).save(appointment);
	}
	
	@Test
	void updateAppointment() throws AppointmentServiceException
	{
		appointmentService.updateByID(1, "Accepted");
		verify(appointmentRepo).update(1, "Accepted");
	}

	@Test
	void previousAppointment() throws AppointmentServiceException
	{
		appointmentService.findPreviousAppointmentByPatientId(1);
		verify(appointmentRepo).findPreviousAppointmentById(1);
	}
	
	@Test
	void appointmentCount() throws AppointmentServiceException
	{
		appointmentService.countAppointments();
		verify(appointmentRepo).count();
	}
	
	@Test
	void appointmentByDate() throws AppointmentServiceException {
		appointmentService.findAppointmentByDate("02-04-2023", "Accepted");
		verify(appointmentRepo).findByDateAndAcceptance("02-04-2023", "Accepted");
	}
}

