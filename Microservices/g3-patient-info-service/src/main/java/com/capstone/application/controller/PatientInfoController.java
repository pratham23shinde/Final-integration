package com.capstone.application.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import com.capstone.application.model.Patient;
import com.capstone.application.service.PatientInfoService;

import lombok.extern.log4j.Log4j2;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/v1")
@Log4j2
public class PatientInfoController {
	private static final org.apache.logging.log4j.Logger log = org.apache.logging.log4j.LogManager.getLogger(PatientInfoController.class);

	
	private PatientInfoService patientInfoService;

	public PatientInfoController(PatientInfoService patientInfoService) 
	{
		super();
		this.patientInfoService = patientInfoService;
	}

	
	@GetMapping("/patient/{patientId}")
	public Optional<Patient> allergyById(@PathVariable int patientId) 
	{
		try {
			log.info("fetching patient information by patientId successfully");
        Optional < Patient > optional = patientInfoService.findById(patientId);
		return optional;
		}
		catch(Exception e)
		{
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}
	
	@PostMapping("/patient/{patientId}")
	 public Patient creatingPatientInfo(@RequestBody Patient patient) {
		try {
			log.info("Added patient information successfully");
        Patient updateResponse = patientInfoService.update(patient);
        return updateResponse;
		}
		catch(Exception e)
		{
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}

	
	@GetMapping("/patient")
	public ResponseEntity<List<Patient>> PatientList() {
		try {
			log.info("Patient list fetched successfully");
		List <Patient> patient = patientInfoService.findAll();
		return new ResponseEntity<>(patient, HttpStatus.OK );
		}
		catch(Exception e)
		{
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}
	
	//aakash
	
	@GetMapping("/patientinfobyid/{patientId}")
	public Optional<Patient> getPatientById(@PathVariable int patientId){
	
	Optional<Patient> patient = patientInfoService.findById(patientId);
	
	return patient;
	}

}
