package com.capstone.application.controller;

import java.time.LocalDateTime;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="*")
@SpringBootApplication
@RestController
public class FallbackMethodClass {

	
	
	@GetMapping("/g3-auth0-service-fallback")
	public ResponseEntity<ErrorResponse> auth0servicefallbackFallback() {
		System.out.println("hii");
		ErrorResponse errorDetails = new ErrorResponse(HttpStatus.SERVICE_UNAVAILABLE, LocalDateTime.now(),
			
				"Auth0 Service is down! Please try later", "For critical support please call on 18080800000 or mail us on spport@revature.com");
		return new ResponseEntity<ErrorResponse>(errorDetails, HttpStatus.SERVICE_UNAVAILABLE);
	}

	@GetMapping("/g3-allergy-service-fallback")
	public ResponseEntity<ErrorResponse> allergyServiceFallback() {
		System.out.println("hii");
		ErrorResponse errorDetails = new ErrorResponse(HttpStatus.SERVICE_UNAVAILABLE, LocalDateTime.now(),
			
				"Allergy Service is down! Please try later", "For critical support please call on 18080800000 or mail us on spport@revature.com");
		return new ResponseEntity<ErrorResponse>(errorDetails, HttpStatus.SERVICE_UNAVAILABLE);
	}
	
	@GetMapping("/g3-appointment-service-fallback")
	public ResponseEntity<ErrorResponse> appointmentServiceFallback() {
		ErrorResponse errorDetails = new ErrorResponse(HttpStatus.SERVICE_UNAVAILABLE, LocalDateTime.now(),
				"Appointment Service is down! Please try later", "For critical support please call on 18080800000 or mail us on spport@revature.com");
		return new ResponseEntity<ErrorResponse>(errorDetails, HttpStatus.SERVICE_UNAVAILABLE);
	}
	
	@GetMapping("/g3-authentication-service-fallback")
	public ResponseEntity<ErrorResponse> authenticationServiceFallback() {
		ErrorResponse errorDetails = new ErrorResponse(HttpStatus.SERVICE_UNAVAILABLE, LocalDateTime.now(),
				"Authentication Service is down! Please try later", "For critical support please call on 18080800000 or mail us on spport@revature.com");
		return new ResponseEntity<ErrorResponse>(errorDetails, HttpStatus.SERVICE_UNAVAILABLE);
	}
	
	@GetMapping("/g3-physician-availability-service-fallback")
	public ResponseEntity<ErrorResponse> physicianAvailabilityServiceFallback() {
		ErrorResponse errorDetails = new ErrorResponse(HttpStatus.SERVICE_UNAVAILABLE, LocalDateTime.now(),
				"Physician Availability Service is down! Please try later", "For critical support please call on 18080800000 or mail us on spport@revature.com");
		return new ResponseEntity<ErrorResponse>(errorDetails, HttpStatus.SERVICE_UNAVAILABLE);
	}
	
	@GetMapping("/g3-patient-info-service-fallback")
	public ResponseEntity<ErrorResponse> patientInfoServiceFallback() {
		ErrorResponse errorDetails = new ErrorResponse(HttpStatus.SERVICE_UNAVAILABLE, LocalDateTime.now(),
				"Patient Info Service is down! Please try later", "For critical support please call on 18080800000 or mail us on spport@revature.com");
		return new ResponseEntity<ErrorResponse>(errorDetails, HttpStatus.SERVICE_UNAVAILABLE);
	}
	
	@GetMapping("/g3-health-record-service-fallback")
	public ResponseEntity<ErrorResponse> healthRecordServiceFallback() {
		ErrorResponse errorDetails = new ErrorResponse(HttpStatus.SERVICE_UNAVAILABLE, LocalDateTime.now(),
				"Health Record Service is down! Please try later", "For critical support please call on 18080800000 or mail us on spport@revature.com");
		return new ResponseEntity<ErrorResponse>(errorDetails, HttpStatus.SERVICE_UNAVAILABLE);
	}
}
