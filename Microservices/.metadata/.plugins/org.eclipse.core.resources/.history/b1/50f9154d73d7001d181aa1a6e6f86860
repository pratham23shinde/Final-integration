package com.capstone.application.service.impl;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.application.dto.VisitDetailsDto;
import com.capstone.application.exception.PatientHealthException;
import com.capstone.application.model.AdminInfo;
import com.capstone.application.model.NurseInfo;
import com.capstone.application.model.Prescription;
import com.capstone.application.model.Tests;
import com.capstone.application.model.VisitDetails;
import com.capstone.application.repository.AdminInfoRepo;
import com.capstone.application.repository.NurseInfoRepo;
import com.capstone.application.repository.PatietHealthRecordsRepository;
import com.capstone.application.repository.PrescriptionRepo;
import com.capstone.application.repository.TestRepo;
import com.capstone.application.service.PatientHealthRecordService;

import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.JSONArray;
import kong.unirest.json.JSONObject;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class PatientHealthRecordsServiceImpl implements PatientHealthRecordService {

	private static final org.apache.logging.log4j.Logger log = org.apache.logging.log4j.LogManager
			.getLogger(PatientHealthRecordsServiceImpl.class);

	@Autowired
	private ModelMapper modelmapper;

	@Autowired
	private PatietHealthRecordsRepository patientHealthRecordsRepository;
	@Autowired
	private TestRepo testrepo;
	@Autowired
	private PrescriptionRepo prescriptionrepo;
	@Autowired
	private AdminInfoRepo adminInfoRepo;
	@Autowired
	private NurseInfoRepo nurseInfoRepo;

	@Override
	public Optional<VisitDetails> findById(Integer patientId) {
		// TODO Auto-generated method stub
		try {
			log.info("Visit Details fetched successfully");
			return patientHealthRecordsRepository.findById(patientId);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public VisitDetails update(VisitDetails visitDetails) {
		// TODO Auto-generated method stub
		try {
			log.info("Updating visit details successfully");
			VisitDetails updateResponse = patientHealthRecordsRepository.save(visitDetails);
			return updateResponse;
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Tests updateforTest(Tests tests) {
		// TODO Auto-generated method stub
		try {
			log.info("Updating test successfully");
			return testrepo.save(tests);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public Prescription updatePrescription(Prescription prescripion) {
		// TODO Auto-generated method stub
		try {
			log.info("Updating prescription details successfully");
			return prescriptionrepo.save(prescripion);
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public VisitDetailsDto createVisitDetails(VisitDetailsDto visitDetailsDto) {
		try {
			log.info("Created visit details successfully");
			modelmapper.getConfiguration().setAmbiguityIgnored(true);
			VisitDetails visitHistory = modelmapper.map(visitDetailsDto, VisitDetails.class);
			VisitDetails saveadvisitHistory = patientHealthRecordsRepository.save(visitHistory);
			VisitDetailsDto savedvisitHistoryDto = modelmapper.map(saveadvisitHistory, VisitDetailsDto.class);
			return savedvisitHistoryDto;
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;

	}

	@Override
	public VisitDetailsDto updateVisitDetials(int patientId, VisitDetailsDto visitDetailsDto) {
		try {
			log.info("Updating visit details successfully");
			VisitDetails existingVisit = patientHealthRecordsRepository.findById(patientId).get();
			existingVisit.setHeight(visitDetailsDto.getHeight());
			existingVisit.setWeight(visitDetailsDto.getWeight());
			existingVisit.setBpDiastolic(visitDetailsDto.getBpDiastolic());
			existingVisit.setBpSystolic(visitDetailsDto.getBpSystolic());
			existingVisit.setBodyTemperature(visitDetailsDto.getBodyTemperature());
			existingVisit.setRepirationRate(visitDetailsDto.getRepirationRate());
			existingVisit.setKeyNotes(visitDetailsDto.getKeyNotes());

			VisitDetails updatedVisitDetails = patientHealthRecordsRepository.save(existingVisit);
			visitDetailsDto = modelmapper.map(updatedVisitDetails, VisitDetailsDto.class);
			return visitDetailsDto;
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;

	}

	@Override
	public List<Prescription> findAllPriscription() {
		try {
			log.info("Fetching prescription successfully");
			return prescriptionrepo.findAll();
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public void postAdmins() throws Throwable, Exception {
		ArrayList<String> emails = new ArrayList<>();
		ArrayList<String> firstName = new ArrayList<>();
		ArrayList<String> lastName = new ArrayList<>();
		ArrayList<String> role = new ArrayList<>();

		kong.unirest.HttpResponse<JsonNode> tokenResponse = Unirest
				.post("https://dev-qnzlgih035ihuldo.us.auth0.com/oauth/token")
				.header("content-type", "application/json")
				.body("{\"client_id\":\"mzd3nJojQh0Y0GfIUUv5De6Mq8HbHK1k\",\"client_secret\":\"nhOi6RhOIDbRf_nj5jnC8H-OX3sZvz573FJI5BdE5ozk96_hH3oYJm7A_mtq-voF\",\"audience\":\"https://dev-qnzlgih035ihuldo.us.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}")
				.asJson();

		JSONArray jsonArray = tokenResponse.getBody().getArray();
		JSONObject jObj = (JSONObject) jsonArray.get(0);
		String token = jObj.getString("access_token");

		kong.unirest.HttpResponse<JsonNode> getUsersResponse = Unirest
				.get("https://dev-qnzlgih035ihuldo.us.auth0.com/api/v2/users?email.domail:gmail.com/")
				.header("Authorization", "Bearer " + token).asJson();

		JSONArray usersArray = getUsersResponse.getBody().getArray();
		System.out.println(usersArray);

		for (int i = 0; i < usersArray.length(); i++) {
			emails.add(usersArray.getJSONObject(i).getString("email"));
			JSONObject user = (JSONObject) usersArray.getJSONObject(i).get("user_metadata");
			firstName.add(user.getString("FirstName"));
			lastName.add(user.getString("LastName"));
			role.add(user.getString("Role"));

		}
		for (int i = 0; i < emails.size(); i++) {

			AdminInfo doc = new AdminInfo();
			doc.setAdmin_email(emails.get(i));
			doc.setFirst_Name(firstName.get(i));
			doc.setLast_Name(lastName.get(i));

			System.out.println(role.get(i));

			int x = adminInfoRepo.isValuePresent(emails.get(i));

			// System.out.println(x);
			if (role.get(i).equals("Admin") && x == 0) {

				adminInfoRepo.save(doc);
			}

		}

	}

	@Override
	public void postNurses() throws Throwable, Exception {

		ArrayList<String> emails = new ArrayList<>();
		ArrayList<String> firstName = new ArrayList<>();
		ArrayList<String> lastName = new ArrayList<>();
		ArrayList<String> role = new ArrayList<>();

		kong.unirest.HttpResponse<JsonNode> tokenResponse = Unirest
				.post("https://dev-qnzlgih035ihuldo.us.auth0.com/oauth/token")
				.header("content-type", "application/json")
				.body("{\"client_id\":\"mzd3nJojQh0Y0GfIUUv5De6Mq8HbHK1k\",\"client_secret\":\"nhOi6RhOIDbRf_nj5jnC8H-OX3sZvz573FJI5BdE5ozk96_hH3oYJm7A_mtq-voF\",\"audience\":\"https://dev-qnzlgih035ihuldo.us.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}")
				.asJson();

		JSONArray jsonArray = tokenResponse.getBody().getArray();
		JSONObject jObj = (JSONObject) jsonArray.get(0);
		String token = jObj.getString("access_token");

		kong.unirest.HttpResponse<JsonNode> getUsersResponse = Unirest
				.get("https://dev-qnzlgih035ihuldo.us.auth0.com/api/v2/users?email.domail:gmail.com/")
				.header("Authorization", "Bearer " + token).asJson();

		JSONArray usersArray = getUsersResponse.getBody().getArray();
		System.out.println(usersArray);

		for (int i = 0; i < usersArray.length(); i++) {
			emails.add(usersArray.getJSONObject(i).getString("email"));
			JSONObject user = (JSONObject) usersArray.getJSONObject(i).get("user_metadata");
			firstName.add(user.getString("FirstName"));
			lastName.add(user.getString("LastName"));
			role.add(user.getString("Role"));

		}

		for (int i = 0; i < emails.size(); i++) {

			NurseInfo doc = new NurseInfo();
			doc.setNurse_email(emails.get(i));
			doc.setFirst_Name(firstName.get(i));
			doc.setLast_Name(lastName.get(i));

			System.out.println(role.get(i));

			int x = nurseInfoRepo.isValuePresent(emails.get(i));

			if (role.get(i).equals("Nurse") && x == 0) {

				nurseInfoRepo.save(doc);
			}
		}

	}

	@Override
	public List<NurseInfo> NursefindAll() {
		try {
			return nurseInfoRepo.findAll();
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	public List<AdminInfo> AdminfindAll() {
		try {
			return adminInfoRepo.findAll();
		} catch (Exception e) {
			e.printStackTrace();
			log.error(e.getMessage());
		}
		return null;
	}

	@Override
	public List<Tests> findTestByVisitId(Integer visitId) {
		// TODO Auto-generated method stub
		return testrepo.findTestByVisitId(visitId);
	}

	@Override
	public List<Integer> findVisitIdByPatientId(Integer patientId) {
		// TODO Auto-generated method stub
		return patientHealthRecordsRepository.findVisitIdByPatientId(patientId);
	}

	@Override
	public List<Prescription> findPrescriptionByVisitId(Integer visitId) {
		// TODO Auto-generated method stub
		return prescriptionrepo.findPrescriptionByVisitId(visitId);
	}

	// aakash solanke ------------------

	@Override
	public List<VisitDetails> findAll() {
		// TODO Auto-generated method stub
		return patientHealthRecordsRepository.findAll();
	}

	@Override
	public VisitDetails findVisistDetailsByAppointmentId(Integer appointmentId) {
		// TODO Auto-generated method stub
		return patientHealthRecordsRepository.findVisitDetailsById(appointmentId);
	}

	@Override
	public VisitDetails getPreviousVisitDetailsByPatientId(Integer patientId) {
		// TODO Auto-generated method stub
		return patientHealthRecordsRepository.findVisitDetailsById(patientId);
	}

	@Override
	public List<Prescription> findPrescriptionById(Integer visitId) {
		// TODO Auto-generated method stub
		return prescriptionrepo.findPrescriptionByVisitId(visitId);
	}

	@Override
	public Prescription savePrescription(Prescription prescription) {
		// TODO Auto-generated method stub
		return prescriptionrepo.save(prescription);
	}

//	@Override
//	public List<Tests> findAllTesta() {
//		// TODO Auto-generated method stub
//		return null;
//	}

	@Override
	public Tests saveTest(Tests test) {
		// TODO Auto-generated method stub
		return testrepo.save(test);
	}

	@Override
	public void deleteTest(Integer testId) {
		// TODO Auto-generated method stub
		testrepo.deleteById(testId);

	}

	// aakash solanke

	@Override
	public VisitDetails getPreviousVisitDetailsByPatientIdforhistory(Integer patientId) {
		// TODO Auto-generated method stub
		return patientHealthRecordsRepository.getPreviousVisitIdDetailsById(patientId);
	}

	@Override
	public Tests updateForTestByTestId(int testId, Tests test) {

		Optional<Tests> testofpatient = testrepo.findById(testId);
		if (testofpatient.isPresent()) {
			test.setTestId(testId);
			return testrepo.save(test);
		}
		return test;
	}

	@Override
	public boolean deletePrescription(int prescriptionId) {
		prescriptionrepo.deleteById(prescriptionId);
		return true;
	}

	@Override
	public boolean updateForPrescriptionByPrescriptionId(int prescriptionId, Prescription prescription) {
		Optional<Prescription> prescriptionofpatient = prescriptionrepo.findById(prescriptionId);

		if (prescriptionofpatient.isPresent()) {
			prescription.setPrescriptionId(prescriptionId);
			prescriptionrepo.save(prescription);
		}
		return true;
	}

	// Eshwari

	@Override

	public Optional<VisitDetails> findBloodGroupForPatient(int patientId) throws PatientHealthException {

		// TODO Auto-generated method stub

		Optional<VisitDetails> result = patientHealthRecordsRepository.getBloodGroup(patientId);
		if (result.isEmpty()) {
			throw new PatientHealthException("No patient found with patient Id " + patientId);
		}

		return patientHealthRecordsRepository.getBloodGroup(patientId);

	}

	@Override

	public Optional<VisitDetails> getDetailsByAppId(int appointmentId) {

		// TODO Auto-generated method stub

		return patientHealthRecordsRepository.getVisitDetailsBtAppId(appointmentId);

	}

	// Sangeeta
	@Override
	public long countNurses() {
		return nurseInfoRepo.count();
	}

	@Override
	public long countAdmins() {
		return adminInfoRepo.count();
	}

	// mrunal
	public List<VisitDetails> findVisitDetailsByVisitId(int visitId) {
		return patientHealthRecordsRepository.findVisitDetailsByVisitId(visitId);
	}

	// gayatri
	public NurseInfo getNurseDetails(String nurse_email) {
		// TODO Auto-generated method stub
		return nurseInfoRepo.getNurseInfoByEmail(nurse_email);
	}

	@Override
	public void deleteNurse(String nurseEmail) {
		// TODO Auto-generated method stub
		nurseInfoRepo.deleteById(nurseEmail);
	}

	@Override
	public void deleteAdmin(String adminEmail) {
		// TODO Auto-generated method stub
		adminInfoRepo.deleteById(adminEmail);

	}

	@Override
	public Optional<AdminInfo> findAdminInfoByEmailId(String email) {
		Optional<AdminInfo> result = adminInfoRepo.findById(email);

		return result;
	}

}
