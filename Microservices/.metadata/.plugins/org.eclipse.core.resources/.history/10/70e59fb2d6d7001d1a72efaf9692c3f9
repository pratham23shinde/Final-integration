package com.capstone.application.service.impl;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.application.exception.PhysicianAvailabilityException;
import com.capstone.application.model.PhysicianAvailabiityModel;
import com.capstone.application.repository.DoctorInfoRepo;
import com.capstone.application.repository.PhysicianAvailabilityRepository;
import com.capstone.application.service.PhysicianAvailabilityService;

import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.JSONArray;
import kong.unirest.json.JSONObject;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class PhysicianAvailabilityServiceImpl implements PhysicianAvailabilityService {

	private PhysicianAvailabilityRepository physicianAvailabilityRepository;

	@Autowired
	private DoctorInfoRepo doctorInfoRepo;

	public PhysicianAvailabilityServiceImpl(PhysicianAvailabilityRepository physicianAvailabilityRepository) {
		super();
		this.physicianAvailabilityRepository = physicianAvailabilityRepository;
	}

	private boolean setTodaysAvailbility(PhysicianAvailabiityModel physicianAvailabiity, String cstartDate,
			String cendDate) throws ParseException {

		PhysicianAvailabiityModel model = null;

		LocalDate timeNow = LocalDate.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-YYYY");
		String today = formatter.format(timeNow).toString();

		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
		Date currentDate = sdf.parse(today);
		Date startdate = sdf.parse(cstartDate);
		Date enddate = sdf.parse(cendDate);
		int sD = currentDate.compareTo(startdate);
		int eD = currentDate.compareTo(enddate);

		if (sD >= 0 && eD <= 0) {
			return true;
		} else {
			return false;
		}

	}

	private void setTodaysAvailbilityForAll() throws ParseException {

		PhysicianAvailabiityModel model = null;
		boolean nullCheck = false;
		List<PhysicianAvailabiityModel> l = physicianAvailabilityRepository.findAll();
		for (PhysicianAvailabiityModel p : l) {
			LocalDate timeNow = LocalDate.now();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-YYYY");
			String today = formatter.format(timeNow).toString();

			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
			Date currentDate = sdf.parse(today);
			Date startdate = sdf.parse(p.getStartDate());
			Date enddate = sdf.parse(p.getEndDate());
			int sD = currentDate.compareTo(startdate);
			int eD = currentDate.compareTo(enddate);

			if (sD >= 0 && eD <= 0) {
				p.setAvailability(true);
				model = p;
			} else {
				p.setAvailability(false);
				model = p;
			}

		}
		if (nullCheck == false) {
			physicianAvailabilityRepository.save(model);
		}

	}

	@Override
	public List<PhysicianAvailabiityModel> findAll() throws PhysicianAvailabilityException {
//List<PhysicianAvailabiityModel>l=physicianAvailabilityRepository.findAll();
		try {
			setTodaysAvailbilityForAll();
		} catch (ParseException e) {
// TODO Auto-generated catch block
			e.printStackTrace();
		}

		List<PhysicianAvailabiityModel> result = physicianAvailabilityRepository.findAll();
		if (result.size() == 0) {
			throw new PhysicianAvailabilityException("No Values Present in the DataBase");
		}

		return result;

	}

	public PhysicianAvailabiityModel update(PhysicianAvailabiityModel physicianAvailabiity)
			throws PhysicianAvailabilityException {

		PhysicianAvailabiityModel p = physicianAvailabiity;
		List<PhysicianAvailabiityModel> l = physicianAvailabilityRepository.findAll();
		for (PhysicianAvailabiityModel i : l) {
			if (i.getPhysicianEmail().equals(physicianAvailabiity.getPhysicianEmail())) {
				p = i;
				break;

			}
		}

		if (l.size() == 0) {
			throw new PhysicianAvailabilityException(
					"No Avalability present with Email: " + physicianAvailabiity.getPhysicianEmail());

		}

		p.setStartDate(physicianAvailabiity.getStartDate());
		p.setEndDate(physicianAvailabiity.getEndDate());

		boolean val = true;
		try {
			val = setTodaysAvailbility(p, p.getStartDate(), p.getEndDate());
		} catch (ParseException e) {
// TODO Auto-generated catch block
			e.printStackTrace();
		}
		p.setAvailability(val);

		PhysicianAvailabiityModel updateResponse = physicianAvailabilityRepository.save(p);
		return updateResponse;
	}

	@Override
	public boolean deletePhysician(String physicianEmail) {
		physicianAvailabilityRepository.deleteById(physicianEmail);
		return true;
	}

	@Override
	public void postDoctors() throws Throwable, Exception {

		ArrayList<String> emails = new ArrayList<>();
		ArrayList<String> firstName = new ArrayList<>();
		ArrayList<String> lastName = new ArrayList<>();
		ArrayList<String> speciality = new ArrayList<>();
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
			JSONObject d = (JSONObject) usersArray.getJSONObject(i).get("user_metadata");
			firstName.add(d.getString("FirstName"));
			lastName.add(d.getString("LastName"));
			role.add(d.getString("Role"));
			speciality.add(d.getString("Speciality"));

		}

		for (int i = 0; i < emails.size(); i++) {

			LocalDate timeNow = LocalDate.now();

			if (role.get(i).equals("Doctor")) {
				int x = physicianAvailabilityRepository.isValuePresent(emails.get(i));
				if (x == 0) {
					// System.out.println(firstName.get(i)+" "+lastName.get(i)+" "+emails.get(i));
					PhysicianAvailabiityModel doc = new PhysicianAvailabiityModel();
					doc.setPhysicianEmail(emails.get(i));
					doc.setFirst_name(firstName.get(i));
					doc.setLast_name(lastName.get(i));
					doc.setSpeciality(speciality.get(i));
					// System.out.println(role.get(i));
					DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-YYYY");
					String yesterday = formatter.format(timeNow.minusDays(1)).toString();

					doc.setStartDate(yesterday);
					doc.setEndDate(yesterday);

					physicianAvailabilityRepository.save(doc);

					// System.out.println(x);

				}
			}

		}

	}

	@Override
	public List<PhysicianAvailabiityModel> findAllPhysicianOnDate(String date) throws ParseException {
// TODO Auto-generated method stub
		List<PhysicianAvailabiityModel> allPhy = physicianAvailabilityRepository.findAll();
		List<PhysicianAvailabiityModel> physicianOnThatDate = new ArrayList<>();
		for (PhysicianAvailabiityModel physician : allPhy) {

			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
			Date currentDate = sdf.parse(date);
			Date startdate = sdf.parse(physician.getStartDate());
			Date enddate = sdf.parse(physician.getEndDate());
			int sD = currentDate.compareTo(startdate);
			int eD = currentDate.compareTo(enddate);

			if (sD == 1 && eD == -1) {
				physicianOnThatDate.add(physician);
			}

		}

		return physicianOnThatDate;
	}

	@Override
	public Optional<PhysicianAvailabiityModel> findDoctorInfoByEmailId(String email)
			throws PhysicianAvailabilityException {
		Optional<PhysicianAvailabiityModel> result = physicianAvailabilityRepository.findById(email);
		if (result.isEmpty()) {
			throw new PhysicianAvailabilityException("No Physician present with Email: " + email);
		}
		return result;
	}

//Sangeeta
	@Override
	public long countDoctors() {
		return physicianAvailabilityRepository.count();

	}

}
