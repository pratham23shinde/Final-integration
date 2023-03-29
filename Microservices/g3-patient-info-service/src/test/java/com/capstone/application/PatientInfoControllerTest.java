package com.capstone.application;

import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import com.capstone.application.controller.PatientInfoController;
import com.capstone.application.service.impl.PatientInfoServiceImpl;

@RunWith(MockitoJUnitRunner.class)
public class PatientInfoControllerTest {

	@InjectMocks
	private PatientInfoController patientController;
	
	@Mock
	private PatientInfoServiceImpl patinetService;
}
