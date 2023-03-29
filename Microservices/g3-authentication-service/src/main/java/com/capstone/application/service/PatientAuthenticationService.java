package com.capstone.application.service;

import java.util.Optional;

import com.capstone.application.dto.PatientDto;
import com.capstone.application.model.Patient;

public interface PatientAuthenticationService {

	Optional<Patient> patientLogin(String email, String password);
	PatientDto createPatient(PatientDto patienDto);

}
