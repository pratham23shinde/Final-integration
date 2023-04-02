package com.capstone.application;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.CoreMatchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.*;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;

import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.capstone.application.controller.PatientInfoController;
import com.capstone.application.model.Patient;
import com.capstone.application.service.PatientInfoService;
import com.fasterxml.jackson.databind.ObjectMapper;


@WebMvcTest
public class PatientInfoServiceAplicationTest {
	
	
	@Autowired
	private WebApplicationContext webApplicationContext;
	
	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private PatientInfoService patientInfoService;
	
	@Autowired
	private ObjectMapper objectMapper;
	
	private Patient p1;
	private Patient p2;
	
	
	@BeforeEach
	void init() {
		
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
		p1 = new Patient();
		p1.setPatientId(1);
		p1.setFirstName("Rushi");
		p1.setLastName("Lokhande");
		p1.setEmail("abcd@gmail.com");
		
	}
	
	@Test
	void patientbyId() throws Exception {

		
		Optional<Patient> x=Optional.ofNullable(p1);
		when(patientInfoService.findById(any())).thenReturn(x);
		
		this.mockMvc.perform(get("http://localhost:9006/api/v1/patient/{patientId}", 1))
		.andExpect(status().isOk())
		.andExpect(jsonPath("$.patientId", is(p1.getPatientId())))
		.andExpect(jsonPath("$.email", is(p1.getEmail())))
		.andExpect(jsonPath("$.firstName", is(p1.getFirstName())))
		.andExpect(jsonPath("$.lastName", is(p1.getLastName())));
		
	}
	
	
	@Test
	void PatientList() throws Exception {

		List<Patient> list = new ArrayList<>();
		list.add(p1);
		
		
		when(patientInfoService.findAll()).thenReturn(list);
		
		
		this.mockMvc.perform(get("http://localhost:9006/api/v1/patient"))
		.andExpect(status().isOk())
		.andExpect(jsonPath("$.size()", is(list.size())));
	}
	
	@Test
	void patientCount() throws Exception {

		List<Patient> list = new ArrayList<>();
		list.add(p1);
		
		
		when(patientInfoService.countPatient()).thenReturn((long) list.size());
		
		
		this.mockMvc.perform(get("http://localhost:9006/api/v1/patientCount"))
		.andExpect(status().isOk())
		.andExpect(jsonPath("$", is(list.size())));
	}
	
	
	
	
	
}
