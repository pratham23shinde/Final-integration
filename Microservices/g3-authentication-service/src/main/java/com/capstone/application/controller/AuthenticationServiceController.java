package com.capstone.application.controller;
import java.util.Optional;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import com.capstone.application.dto.PatientDto;
import com.capstone.application.model.Email;
import com.capstone.application.model.Patient;
import com.capstone.application.service.PatientAuthenticationService;

import lombok.extern.log4j.Log4j2;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/v1")
@Log4j2
public class AuthenticationServiceController {
	
	private static final org.apache.logging.log4j.Logger log = org.apache.logging.log4j.LogManager.getLogger(AuthenticationServiceController.class);


	private PatientAuthenticationService patientAuthenticationService;
	
	
	public AuthenticationServiceController(PatientAuthenticationService patientAuthenticationService) {
		super();
		this.patientAuthenticationService = patientAuthenticationService;
	}

	@PostMapping("/patient/login")
	public ResponseEntity<Optional<Patient>> login(@RequestBody Email email)
	{
		try {
			
		Optional<Patient> patient=patientAuthenticationService.patientLogin(email.getEmail(), email.getPassword());
		
		return ResponseEntity.ok(patient);
		}
		catch(Exception e)
		{
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
		
	}
		
	@PostMapping("/patient/register")
	public PatientDto patientRegister( @RequestBody PatientDto patientDto)
	{
		try {
			log.info("Patient registrated successfully");
		return patientAuthenticationService.createPatient(patientDto);
		}
	catch(Exception e)
	{
		log.error(e.getMessage());
		throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
	}
	}
}
