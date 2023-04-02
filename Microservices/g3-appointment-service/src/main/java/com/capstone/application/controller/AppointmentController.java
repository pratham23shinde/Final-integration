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

import com.capstone.application.exception.AppointmentServiceException;
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
	public List<Appointment> appointmentsByAppointmentId(@PathVariable int appointmentId) throws AppointmentServiceException {
		
		return appointmentService.findAppointmentsByAppointmentId(appointmentId);
	}
	
	@GetMapping("/patient/{patientId}/allappointments")
	public List<Integer> allAppointmentsForPatientId(@PathVariable int patientId) throws AppointmentServiceException
	{
		return appointmentService.findAllAppointmentsByPatientId(patientId);
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
	public List<Appointment> appointmetForPatientId(@PathVariable int patientId) throws AppointmentServiceException
	{
		return appointmentService.findByAppointmentById(patientId);
		
	}
	
	
	@GetMapping("/appointment/{physicianEmail}")
	public List<Appointment> pendingAppointmentByEmail(@PathVariable String physicianEmail,@RequestParam String acceptance) throws AppointmentServiceException{
		return appointmentService.findByAppointmentByPEmail(physicianEmail,acceptance);
		
	} 
	
	@GetMapping("/appointment/{physicianEmail}/{date}")
	public List<Appointment> AcceptedAppointmentByEmailandDate(@PathVariable String physicianEmail, @PathVariable String date,@RequestParam String acceptance) throws AppointmentServiceException{
		return appointmentService.findByAppointmentByPEmailandDate(physicianEmail,date,acceptance);
		
	}
	
	@GetMapping("/appointments")
	public  List<Appointment> acceptedAppointmentForNurse(@RequestParam String acceptance) throws AppointmentServiceException
	{
		return appointmentService.findByAcceptedAppointment(acceptance);
	}
	
	@PostMapping("/appointment")
	public Appointment Createappointment(@RequestBody Appointment appointment) throws AppointmentServiceException
	{
		return appointmentService.saveAppointment(appointment);
	}
	
	@PutMapping("/appointments/{appointmentId}")
	public Appointment updatedPhysicianAvailabilitys(@RequestBody Appointment appointment) throws AppointmentServiceException
	{
		Appointment updateResponse = appointmentService.update(appointment);
        return updateResponse;
	}
	
	@DeleteMapping("/appointment/{appointmentId}")
	public boolean deleteAppointmentById(@PathVariable("appointmentId")Integer appointmentId) throws AppointmentServiceException
	{
		return appointmentService.deleteAppointment(appointmentId);
		
	}
	
	//aakash solanke
	@PutMapping("/appointments/{appointmentId}/{status}")
	@Transactional
	public void updatedPhysicianAvailabilitys(@PathVariable int appointmentId, @PathVariable String status) throws AppointmentServiceException
	{
		appointmentService.updateByID(appointmentId,status);
	}
	
	
	@PutMapping("/rejectedappointments/{appointmentId}/{status}")
	@Transactional
	public void rejectAppointment(@PathVariable int appointmentId, @PathVariable String status) throws AppointmentServiceException 
	{
		appointmentService.updateByID(appointmentId,status);
        
	}
	
	@GetMapping("/appointment/{patientId}/previous")
	public Appointment previousAppointment(@PathVariable int patientId) throws AppointmentServiceException{
	return appointmentService.findPreviousAppointmentByPatientId(patientId);
	}
	
	//Sangeeta
		@GetMapping("/appointmentCount")
		public long appointmentCount() {
		return appointmentService.countAppointments();
		}
	
		//gayatri
		@GetMapping("/appointment/nurse/{date}")
		public List<Appointment> AcceptedAppointmentByDate( @PathVariable String date,@RequestParam String acceptance) throws AppointmentServiceException {
			System.out.println(date +" "+" "+ acceptance);
			return appointmentService.findAppointmentByDate(date,acceptance);
			
		}
		
}
