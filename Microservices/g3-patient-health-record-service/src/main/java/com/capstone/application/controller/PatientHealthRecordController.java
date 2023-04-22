package com.capstone.application.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import com.capstone.application.dto.VisitDetailsDto;
import com.capstone.application.exception.PatientHealthException;
import com.capstone.application.model.AdminInfo;
import com.capstone.application.model.NurseInfo;
import com.capstone.application.model.Prescription;
import com.capstone.application.model.Tests;
import com.capstone.application.model.VisitDetails;
import com.capstone.application.service.PatientHealthRecordService;

import lombok.extern.log4j.Log4j2;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/patient-health-record-service")
@Log4j2
public class PatientHealthRecordController {
	private static final org.apache.logging.log4j.Logger log = org.apache.logging.log4j.LogManager
			.getLogger(PatientHealthRecordController.class);

	private PatientHealthRecordService patientHealthRecordService;

	public PatientHealthRecordController(PatientHealthRecordService patientHealthRecordService) {
		super();
		this.patientHealthRecordService = patientHealthRecordService;
	}

	// Eshwari changes
	@GetMapping("/patient/{patientId}/bloodgroup")

	public Optional<VisitDetails> FindPatientBloodGroup(@PathVariable int patientId) throws PatientHealthException {

		return patientHealthRecordService.findBloodGroupForPatient(patientId);

	}

	@GetMapping("/patient/visitDetails/{appointmentId}")

	public Optional<VisitDetails> getPatientDetailsByappointmentid(@PathVariable int appointmentId) {

		return patientHealthRecordService.getDetailsByAppId(appointmentId);

	}

	@GetMapping("/patient/{patientId}/health-records")
	public Optional<VisitDetails> healthRecordsById(@PathVariable int patientId) {
		try {
			log.info("Patient health records fetched successfully");
			Optional<VisitDetails> optional = patientHealthRecordService.findById(patientId);
			return optional;
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}

	// Implemented method by pranit
	@GetMapping("/patient/{patientId}/visitId")
	public List<Integer> findVisitIdByPatientId(@PathVariable int patientId) {
		try {

			log.info("Visit details fetched by patientId successfully");
			List<Integer> list = patientHealthRecordService.findVisitIdByPatientId(patientId);
			return list;
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}

//	
//	@GetMapping("/patient/{patientId}/visitId")
//	public List<Integer> findVisitIdByPatientId(@PathVariable int patientId){
//		List <Integer> list = patientHealthRecordService.findVisitIdByPatientId(patientId);
//		return list;
//	}
	@GetMapping("/patient/{visitId}/test-records")
	public List<Tests> findTestsByVisitId(@PathVariable int visitId) {
		List<Tests> list = patientHealthRecordService.findTestByVisitId(visitId);
		return list;
	}

	@PostMapping("/patient/health-records")
	public VisitDetailsDto insertVisitDetials(@RequestBody VisitDetailsDto visitDetailsDto) {
		try {
			log.info("Patient health record submitted successfully");
			log.info(visitDetailsDto.getAllergyName());
			return patientHealthRecordService.createVisitDetails(visitDetailsDto);
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}

	@PutMapping("/patient/{patientId}/health-records")
	public VisitDetailsDto updatePatientInforDoctors(@PathVariable int patientId,
			@RequestBody VisitDetailsDto visitDetailsDto) {
		try {
			log.info("Patient health record updated successfully");
			return patientHealthRecordService.updateVisitDetials(patientId, visitDetailsDto);
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}

	@PostMapping("/patient/{visitId}/tests")
	public Tests updateTest(@RequestBody Tests tests) {
		try {
			log.info("Pateint's test added successfully");
			Tests updateResponse = patientHealthRecordService.updateforTest(tests);
			return updateResponse;
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}

	}

	@GetMapping("/patient/prescription")
	public List<Prescription> findAllPrescription() {
		try {
			log.info("Fetching patient prescription by patinetId successfully");
			return patientHealthRecordService.findAllPriscription();
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}

	@GetMapping("/addAdmins")
	public void postAdmins() throws Exception, Throwable {
		try {
			log.info("Added admins in the admin table from auth0 successfully");
			patientHealthRecordService.postAdmins();
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}

	}

	@GetMapping("/addNurses")
	public void postNurses() throws Exception, Throwable {
		try {
			log.info("Added nurses from Auth0 successfully");
			patientHealthRecordService.postNurses();
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}

	}

	@GetMapping("/nurses")
	public ResponseEntity<List<NurseInfo>> NurseList() {
		try {
			log.info("Fetched all the nurse list");
			List<NurseInfo> nurse = patientHealthRecordService.NursefindAll();
			return new ResponseEntity<>(nurse, HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}

	@GetMapping("/patient/{visitId}/prescription")
	public List<Prescription> findPrescriptionsByVisitId(@PathVariable int visitId) {
		// List < Prescription > list=
		return patientHealthRecordService.findPrescriptionByVisitId(visitId);
	}

	@GetMapping("/admins")
	public ResponseEntity<List<AdminInfo>> AdminList() {
		try {
			log.info("Fectching admin list from the table successfully");
			List<AdminInfo> nurse = patientHealthRecordService.AdminfindAll();
			return new ResponseEntity<>(nurse, HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}

	// aakash solanke

	@GetMapping("/patient/health-records/{appointmentId}")
	public VisitDetails healthRecordsByIdAppointmentId(@PathVariable int appointmentId) {

		return patientHealthRecordService.findVisistDetailsByAppointmentId(appointmentId);
	}

	// ME
	@GetMapping("/patient/Previous-visitDetails-records/{patientId}")
	public VisitDetails previousVisistDetailsRecords(@PathVariable Integer patientId) {
		return patientHealthRecordService.getPreviousVisitDetailsByPatientId(patientId);

	}

	@GetMapping("/prescription/{visitId}")
	public List<Prescription> getPrescriptionById(@PathVariable Integer visitId) {
		return patientHealthRecordService.findPrescriptionById(visitId);
	}

	@PostMapping("/patient/prescription")
	public Prescription updatePrescription(@RequestBody Prescription prescription) {
		Prescription updateResponse = patientHealthRecordService.savePrescription(prescription);
		return updateResponse;
	}

	@GetMapping("/patient/Previous-visitDetails-records-for-history/{patientId}")
	public VisitDetails getVisitDetailsByPatientIdForHistory(@PathVariable Integer patientId) {

		return patientHealthRecordService.getPreviousVisitDetailsByPatientIdforhistory(patientId);

	}

	@PutMapping("/updateTest/{testId}")
	public Tests updateTestByTestId(@PathVariable int testId, @RequestBody Tests test) {
		return patientHealthRecordService.updateForTestByTestId(testId, test);
	}

	@DeleteMapping("/deletePrescription/{prescriptionId}")
	public void deletePrescriptionById(@PathVariable Integer prescriptionId) {
		patientHealthRecordService.deletePrescription(prescriptionId);
	}

	@PutMapping("/updatePrescription/{prescriptionId}")
	public void updatePrescription(@PathVariable int prescriptionId, @RequestBody Prescription prescription) {

	}

//	@PostMapping("/patient/{visitId}/prescription")
//	public Prescription updatePrescription(@RequestBody Prescription prescription) {
//		try {
//			log.info("Patient prescription added successfully");
//		Prescription updateResponse=patientHealthRecordService.updatePrescription(prescription);
//		return updateResponse;
//		}
//		catch(Exception e)
//		{
//			log.error(e.getMessage());
//			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
//		}
//	}

	@PostMapping("/savetest")
	public Tests saveTest(@RequestBody Tests test) {
		return patientHealthRecordService.saveTest(test);

	}

	@DeleteMapping("/tests/{testId}")
	public void delete(@PathVariable("testId") Integer testId) {
		patientHealthRecordService.deleteTest(testId);

	}

	// Sangeeta

	@GetMapping("/nurseCount")
	public long nurseCount() {
		return patientHealthRecordService.countNurses();
	}

	@GetMapping("/adminCount")
	public long adminCount() {
		return patientHealthRecordService.countAdmins();
	}

	// mrunal
	@GetMapping("/patient/{visitId}/visit-details")
	public List<VisitDetails> findVisitDetailsByVisitId(@PathVariable int visitId) {
		return patientHealthRecordService.findVisitDetailsByVisitId(visitId);
	}

	// gayatri
	@GetMapping("/nursedetails/{nurse_email}")
	public NurseInfo getNurseDetails(@PathVariable String nurse_email) {
		return patientHealthRecordService.getNurseDetails(nurse_email);
	}

	@DeleteMapping("/deleteNurse/{nurseEmail}")
	public ResponseEntity<?> deleteNurse(@PathVariable("nurseEmail") String nurseEmail) {
		try {
			log.info("deleted successfully");
			patientHealthRecordService.deleteNurse(nurseEmail);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}

	@DeleteMapping("/deleteAdmin/{adminEmail}")
	public ResponseEntity<?> deleteAdmin(@PathVariable("adminEmail") String adminEmail) {
		try {
			log.info("Physician availability deleted successfully");
			patientHealthRecordService.deleteAdmin(adminEmail);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}

	@GetMapping("/admin/{email}")
	public Optional<AdminInfo> findDoctorInfoByEmail(@PathVariable String email) {
		return patientHealthRecordService.findAdminInfoByEmailId(email);
	}

}
