package com.capstone.application;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.capstone.application.repository.AdminInfoRepo;
import com.capstone.application.repository.NurseInfoRepo;
import com.capstone.application.repository.PatietHealthRecordsRepository;
import com.capstone.application.repository.PrescriptionRepo;
import com.capstone.application.repository.TestRepo;
import com.capstone.application.service.impl.PatientHealthRecordsServiceImpl;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class PatientHealthRecordServiceApplicationTests {

	@Mock private PatietHealthRecordsRepository patientHealthRecordsRepository;
	@Mock private TestRepo testrepo;
	@Mock private PrescriptionRepo prescriptionrepo;
	@Mock private AdminInfoRepo adminInfoRepo;
	@Mock private NurseInfoRepo nurseInfoRepo;
	
	private PatientHealthRecordsServiceImpl PHRservice;
	

	
	
	
}
