package com.capstone.application;

import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;

import com.capstone.application.dto.PatientDto;
import com.capstone.application.model.Patient;
import com.capstone.application.repository.PatientAuthenticationRepository;
import com.capstone.application.service.impl.PatientAuthenticationServiceImpl;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class AuthenticationServiceApplicationTests {

	
	@Mock
	private ModelMapper modelmapper;
	
	@Mock private PatientAuthenticationRepository authRepo;
	private PatientAuthenticationServiceImpl authService;
	
	
	@BeforeEach void setup()
	{
		this.authService=new PatientAuthenticationServiceImpl(authRepo);
	}
	
	@Test
	void login() {
		authService.patientLogin("pranit@gmail.com", "1234");
		verify(authRepo).authenticateByEmailandPassword("pranit@gmail.com", "1234");
	}
	
	@Test
	void register() {
		PatientDto patientDto=new PatientDto();
		patientDto.setTitle("Mr");
		patientDto.setEmail("pranit@gmail.com");
		patientDto.setFirstName("Pranit");
		patientDto.setLastName("Patil");
		patientDto.setDob("23-05-1998");
		patientDto.setContactNumber("7418529637");
		patientDto.setGender("M");
		patientDto.setPassword("1234");
		patientDto.setAddress("Pune");
		authService.createPatient(patientDto);
		Patient patient=modelmapper.map(patientDto, Patient.class);
		verify(authRepo).save(patient);
	}
	

}
