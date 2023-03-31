package com.capstone.application.service.impl;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.application.dto.PatientDto;
import com.capstone.application.model.Patient;
import com.capstone.application.repository.PatientAuthenticationRepository;
import com.capstone.application.service.PatientAuthenticationService;

import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class PatientAuthenticationServiceImpl implements PatientAuthenticationService{
	private static final org.apache.logging.log4j.Logger log = org.apache.logging.log4j.LogManager.getLogger(PatientAuthenticationServiceImpl.class);

	@Autowired
	private ModelMapper modelmapper;

	private PatientAuthenticationRepository patientAuthenticationRepository;
	
	public PatientAuthenticationServiceImpl(PatientAuthenticationRepository patientAuthenticationRepository) {
		super();
		this.patientAuthenticationRepository = patientAuthenticationRepository;
	}


	@Override
	public Optional<Patient> patientLogin(String email, String password) {
		// TODO Auto-generated method stub
		try {
			
		return patientAuthenticationRepository.authenticateByEmailandPassword(email,password);
		}
		catch(Exception e)
		{
			 e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}
	
	@Override
	public PatientDto createPatient(PatientDto patinetDto) {
		try {
			log.info("Patient registered successfully");
		Patient patient=modelmapper.map(patinetDto, Patient.class);
		Patient saveadPatient=patientAuthenticationRepository.save(patient);
		PatientDto savedPatientDto=modelmapper.map(saveadPatient, PatientDto.class);
		return savedPatientDto;
		}
		catch(Exception e)
		{
			 e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

}
