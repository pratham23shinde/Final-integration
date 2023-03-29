package com.capstone.application.controller;
import java.util.List;

import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import com.capstone.application.model.Appointment;
import com.capstone.application.service.AppointmentService;

import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;


@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/v1")
@Log4j2
public class AppointmentController 
{
	private static final org.apache.logging.log4j.Logger log = org.apache.logging.log4j.LogManager.getLogger(AppointmentController.class);

	
	private AppointmentService appointmentService;
	

	public AppointmentController(AppointmentService appointmentService) {
		super();
		this.appointmentService = appointmentService;
	}
	@GetMapping("/appointments/{appointmentId}")
	public List<Appointment> appointmentsByAppointmentId(@PathVariable int appointmentId) {
		try {
			log.info("Appointment details fetched by ID successfully");
		return appointmentService.findAppointmentsByAppointmentId(appointmentId);
		}
		catch(Exception e)
		{
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}
	
	@GetMapping("/patient/{patientId}/allappointments")
	public List<Integer> allAppointmentsForPatientId(@PathVariable int patientId)
	{
		try {
			log.info("Patient all appointment information fetced by patientId successfully");
		return appointmentService.findAllAppointmentsByPatientId(patientId);
		}
		catch(Exception e)
		{
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}

//	@GetMapping("/appointment/{patientId}/previous")
//	public Appointment previousAppointment(@PathVariable int patientId) {
//		try {
//			log.info("Patient's previous appointment fetched by patientId successfully");
//	return appointmentService.findPreviousAppointmentByPatientId(patientId);
//		}
//		catch(Exception e)
//		{
//			log.error(e.getMessage());
//			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
//		}
//	}
	
	
	
	@GetMapping("/patient/{patientId}/appointments")
	public List<Appointment> appointmetForPatientId(@PathVariable int patientId)
	{
		try {
			log.info("Patient all appointments information fetched successfully");
		return appointmentService.findByAppointmentById(patientId);
		}
		catch(Exception e)
		{
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}
	
	@GetMapping("/appointment/{physicianEmail}")
	public List<Appointment> pendingAppointmentByEmail(@PathVariable String physicianEmail,@RequestParam String acceptance) {
		try {
			log.info("All appointments for physician fetched successfully");
		return appointmentService.findByAppointmentByPEmail(physicianEmail,acceptance);
		}
		catch(Exception e)
		{
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	} 
	
	@GetMapping("/appointment/{physicianEmail}/{date}")
	public List<Appointment> AcceptedAppointmentByEmailandDate(@PathVariable String physicianEmail, @PathVariable String date,@RequestParam String acceptance) {
		try {
			log.info("All appointments for a particular date fetched successfully");
	return appointmentService.findByAppointmentByPEmailandDate(physicianEmail,date,acceptance);
		}
		catch(Exception e)
		{
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}
	
	@GetMapping("/appointments")
	public  List<Appointment> acceptedAppointmentForNurse(@RequestParam String acceptance)
	{
		try {
			log.info("All accepted appointments list fetched successfully");
		return appointmentService.findByAcceptedAppointment(acceptance);
		}
		catch(Exception e)
		{
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}
	
	@PostMapping("/appointment")
	public Appointment Createappointment(@RequestBody Appointment appointment)
	{
		try {
			log.info("Appointment booked successfully");
		return appointmentService.saveAppointment(appointment);
		}
		catch(Exception e)
		{
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}
	
	@PutMapping("/appointments/{appointmentId}")
	public Appointment updatedPhysicianAvailabilitys(@RequestBody Appointment appointment) 
	{
		try {
	        log.info("Appointment updated successfully");
		Appointment updateResponse = appointmentService.update(appointment);
        return updateResponse;
		}
		catch(Exception e)
		{
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}
	
	@DeleteMapping("/appointment/{appointmentId}")
	public boolean deleteAppointmentById(@PathVariable("appointmentId")Integer appointmentId) {
		try {
			log.info("Appointment deleted successfully");
		return appointmentService.deleteAppointment(appointmentId);
		}
		catch(Exception e)
		{
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
		
	}
	
	//aakash solanke
	@PutMapping("/appointments/{appointmentId}/{status}")
	@Transactional
	public void updatedPhysicianAvailabilitys(@PathVariable int appointmentId, @PathVariable String status) 
	{
		try {
		appointmentService.updateByID(appointmentId,status);
        
		}
		catch(Exception e)
		{
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}
	
	
	@PutMapping("/rejectedappointments/{appointmentId}/{status}")
	@Transactional
	public void rejectAppointment(@PathVariable int appointmentId, @PathVariable String status) 
	{
		try {
		appointmentService.updateByID(appointmentId,status);
        
		}
		catch(Exception e)
		{
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}

	@GetMapping("/appointment/{patientId}/previous")
	public Appointment previousAppointment(@PathVariable int patientId) {
	return appointmentService.findPreviousAppointmentByPatientId(patientId);
	}
	
	//Sangeeta
		@GetMapping("/appointmentCount")
		public long appointmentCount() {
		return appointmentService.countAppointments();
		}
}
