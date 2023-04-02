//package com.capstone.application;
//
//import static org.mockito.Mockito.verify;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import com.capstone.application.model.Appointment;
//import com.capstone.application.repository.AppointmentRepository;
//import com.capstone.application.service.impl.AppointmentServiceImpl;
//
//@SpringBootTest
//@ExtendWith(MockitoExtension.class)
//class AppointmentApplicationTests {
//
//	@Mock private AppointmentRepository appointmentRepo;
//	private AppointmentServiceImpl appointmentService;
//	
//	@BeforeEach void setup()
//	{
//		this.appointmentService=new AppointmentServiceImpl(this.appointmentRepo);
//	}
//	
//	@Test
//	void getAllAppointments() {
//		appointmentService.findAppointmentsByAppointmentId(1);
//		verify(appointmentRepo).findAppointmentByAppointmentId(1);
//	}
//	
//	@Test
//	void getAppointmentByPatientId() {
//		appointmentService.findByAppointmentById(1);
//		verify(appointmentRepo).findByPatientId(1);
//	}
//	
//	@Test
//	void getAppointmentByEmail() {
//		appointmentService.findByAppointmentByPEmail("aakash.solanke@gmail.com","Accepted");
//		verify(appointmentRepo).findByEmail("aakash.solanke@gmail.com", "Accepted");
//	}
//	
//	@Test
//	void deleteAppointment() {
//		appointmentService.deleteAppointment(1);
//		verify(appointmentRepo).deleteById(1);
//	}
//	
//	@Test
//	void getAcceptedAppointements() {
//		appointmentService.findByAcceptedAppointment("Accepted");
//		verify(appointmentRepo).findByAcceptance("Accepted");
//	}
//	
//	@Test
//	void getAppointementByEmailandDate()
//	{
//		appointmentService.findByAppointmentByPEmailandDate("aakash.solanke@gmail.com", "30-3-2023", "Accepted");
//		verify(appointmentRepo).findByEmailandDate("aakash.solanke@gmail.com", "30-3-2023", "Accepted");
//	}
//	
//	@Test
//	void createAppointment() {
//		Appointment appointment =new Appointment();
//		appointment.setDrFirstName("Aaksah");
//		appointment.setDrLastName("Solanke");
//		appointment.setReason("Head");
//		appointment.setDate("30-03-2023");
//		appointment.setPatientId(1);
//		appointment.setPhysicianEmail("aakash.solanke@gmail.com");
//		appointment.setAcceptance("Accepted");
//		appointment.setSubmissionDate("28-03-2023");
//		appointmentService.saveAppointment(appointment);
//		verify(appointmentRepo).save(appointment);
//	}
//	
//	@Test
//	void updateAppointment()
//	{
//		appointmentService.updateByID(1, "Accepted");
//		verify(appointmentRepo).update(1, "Accepted");
//	}
//
//}
