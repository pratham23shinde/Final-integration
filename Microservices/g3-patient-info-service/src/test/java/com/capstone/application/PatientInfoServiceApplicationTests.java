package com.capstone.application;

import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.capstone.application.model.Patient;
import com.capstone.application.repository.PatientInfoRepository;
import com.capstone.application.service.impl.PatientInfoServiceImpl;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class PatientInfoServiceApplicationTests {

	@Mock private PatientInfoRepository patientRepo;
	private PatientInfoServiceImpl patientInfoService;
	
	@BeforeEach void setup()
	{
		this.patientInfoService=new PatientInfoServiceImpl(patientRepo);
	}
	
	@Test
	void getAllPatients()
	{
		patientInfoService.findAll();
		verify(patientRepo).findAll();
	}
	
	@Test
	void findingPatientById()
	{
		patientInfoService.findById(1);
		verify(patientRepo).findById(1);
	}

	@Test
	void updatePatient()
	{
		Patient patient =new Patient();
		patient.setAddress("Pune");
		patient.setContactNumber("7418529637");
		patient.setDob("23-03-1998");
		patient.setEmail("pranit@gmail.com");
		patient.setFirstName("Pranit");
		patient.setGender("M");
		patient.setLastName("Patil");
		patient.setPassword("1234");
		patient.setPatientId(1);
		patient.setTitle("Mr");
		
		patientInfoService.update(patient);
		verify(patientRepo).save(patient);
	}
}
