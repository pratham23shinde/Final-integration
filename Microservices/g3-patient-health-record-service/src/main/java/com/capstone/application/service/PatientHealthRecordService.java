package com.capstone.application.service;

import java.util.List;
import java.util.Optional;

import com.capstone.application.dto.VisitDetailsDto;
import com.capstone.application.exception.PatientHealthException;
import com.capstone.application.model.AdminInfo;
import com.capstone.application.model.NurseInfo;
import com.capstone.application.model.Prescription;
import com.capstone.application.model.Tests;
import com.capstone.application.model.VisitDetails;

public interface PatientHealthRecordService {

	public Optional<VisitDetails> findById(Integer patientId);

	public VisitDetails update(VisitDetails visitDetails);

	public Prescription updatePrescription(Prescription prescripion);

	public Tests updateforTest(Tests tests);

	public VisitDetailsDto createVisitDetails(VisitDetailsDto visitDetailsDto);

	public VisitDetailsDto updateVisitDetials(int patientId, VisitDetailsDto visitDetailsDto);

	public List<Prescription> findAllPriscription();

	public void postAdmins() throws Throwable, Exception;

	public void postNurses() throws Throwable, Exception;

	public List<NurseInfo> NursefindAll();

	public List<AdminInfo> AdminfindAll();

	// Patient new methods (Pranit)
	public List<Tests> findTestByVisitId(Integer visitId);

	public List<Integer> findVisitIdByPatientId(Integer patientId);

	public List<Prescription> findPrescriptionByVisitId(Integer visitId);

	// aakash solanke

	public List<VisitDetails> findAll();

	public VisitDetails findVisistDetailsByAppointmentId(Integer appointmentId);

	public VisitDetails getPreviousVisitDetailsByPatientId(Integer patientId);

	public List<Prescription> findPrescriptionById(Integer visitId);

	public Prescription savePrescription(Prescription prescription);

//	public List<Tests> findAllTesta();

	public Tests saveTest(Tests test);

	public void deleteTest(Integer testId);

	public VisitDetails getPreviousVisitDetailsByPatientIdforhistory(Integer patientId);

	public Tests updateForTestByTestId(int testId, Tests test);

	public boolean deletePrescription(int prescriptionId);

	public boolean updateForPrescriptionByPrescriptionId(int prescriptionId, Prescription prescription);

	// Eshwari

	public Optional<VisitDetails> findBloodGroupForPatient(int patientId) throws PatientHealthException;

	public Optional<VisitDetails> getDetailsByAppId(int appointmentId);
	
	//Sangeeta
		public long countNurses();

		public long countAdmins();
		
		//mrunal
		public List<VisitDetails> findVisitDetailsByVisitId(int visitId);
		
		//gayatri
		public NurseInfo getNurseDetails(String nurse_email);

}
