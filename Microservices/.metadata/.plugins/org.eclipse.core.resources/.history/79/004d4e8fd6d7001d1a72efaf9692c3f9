package com.capstone.application.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import com.capstone.application.exception.PhysicianAvailabilityException;
import com.capstone.application.model.PhysicianAvailabiityModel;
import com.capstone.application.service.PhysicianAvailabilityService;

import lombok.extern.log4j.Log4j2;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
@Log4j2
public class PhysicianAvailabilityControllers {
	private static final org.apache.logging.log4j.Logger log = org.apache.logging.log4j.LogManager
			.getLogger(PhysicianAvailabilityControllers.class);

	private PhysicianAvailabilityService physicianAvailabilityService;

	public PhysicianAvailabilityControllers(PhysicianAvailabilityService physicianAvailabilityService) {
		super();
		this.physicianAvailabilityService = physicianAvailabilityService;
	}

	@GetMapping("/physician-availability")
	public ResponseEntity<List<PhysicianAvailabiityModel>> AvailablePhysician() {
		try {
			log.info("Physician Availability list fetched successfully");
			List<PhysicianAvailabiityModel> availablePhysician = physicianAvailabilityService.findAll();
			return new ResponseEntity<>(availablePhysician, HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}

	@GetMapping("/physician-avail")
	public List<PhysicianAvailabiityModel> AvailablePhysician1(@RequestParam boolean availability) {
		try {
			log.info("Available physician fetched successfully");
			List<PhysicianAvailabiityModel> availablePhysician = physicianAvailabilityService.findAll();
			List<PhysicianAvailabiityModel> availableP = new ArrayList<>();
			for (PhysicianAvailabiityModel i : availablePhysician) {
				if (i.isAvailability() == availability) {
					// System.out.println(i.getPhysicianEmail());
					availableP.add(i);
				}
			}

			return availableP;
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}

//	@PostMapping("/physician-availability")
//	public PhysicianAvailabiityModel updatedPhysicianAvailability(@RequestBody PhysicianAvailabiityModel physicianAvailabiity) 
//	{
//		PhysicianAvailabiityModel updateResponse = physicianAvailabilityService.update(physicianAvailabiity);
//        return updateResponse;
//	}
//	
	@PutMapping("/physician-availability")
	public ResponseEntity<PhysicianAvailabiityModel> updatedPhysicianAvailabilitys(
			@RequestBody PhysicianAvailabiityModel physicianAvailabiity) {
		try {
			log.info("Physician availability updated successfully");
			PhysicianAvailabiityModel updateResponse = physicianAvailabilityService.update(physicianAvailabiity);
			return new ResponseEntity<>(updateResponse, HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}

	}

	@DeleteMapping("/physician-availability/{physicianEmail}")
	public ResponseEntity<?> deletePhysicianAvailability(@PathVariable("physicianEmail") String physicianEmail) {
		try {
			log.info("Physician availability deleted successfully");
			physicianAvailabilityService.deletePhysician(physicianEmail);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}
	}

	@GetMapping("/addDoctors")
	public boolean postDoctors() throws Exception, Throwable {
		try {
			log.info("Doctors added into doctor table successfully");
			physicianAvailabilityService.postDoctors();
			return true;
		} catch (Exception e) {
			log.error(e.getMessage());
			throw new HttpClientErrorException(HttpStatusCode.valueOf(500));
		}

	}

	@GetMapping("/physician-available/OnthatDate/{date}")
	public List<PhysicianAvailabiityModel> AvailablePhysicianOnthatDate(@PathVariable String date)
			throws ParseException {

		return physicianAvailabilityService.findAllPhysicianOnDate(date);
	}

	@GetMapping("/doctorInfo/{email}")
	public Optional<PhysicianAvailabiityModel> findDoctorInfoByEmail(@PathVariable String email)
			throws PhysicianAvailabilityException {
		return physicianAvailabilityService.findDoctorInfoByEmailId(email);

	}

	// Sangeeta
	@GetMapping("/doctorCount")
	public long doctorCount() {
		return physicianAvailabilityService.countDoctors();
	}
}
