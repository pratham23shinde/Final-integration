package com.capstone.application.controller;


import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.application.exception.AllergyServiceException;
import com.capstone.application.model.Allergy;
import com.capstone.application.service.AllergyService;

import lombok.extern.log4j.Log4j2;



@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/v1")
@Log4j2
public class AllergyController 
{	
	private static final org.apache.logging.log4j.Logger log = org.apache.logging.log4j.LogManager.getLogger(AllergyController.class);
	
    private AllergyService allergyService;
    
	
	public AllergyController(AllergyService allergyService) {
		super();
		this.allergyService = allergyService;
	}

	@GetMapping("/allergyList")
	public List<Allergy> allergy() throws AllergyServiceException 
	{
		List < Allergy > allergy = allergyService.findAll();
		log.info("Allergy controller passing controller to allergy service");
		return allergy;
		
	}
	
	
	@GetMapping("/allergy/{allergyId}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public Optional<Allergy> allergyById(@PathVariable int allergyId) throws AllergyServiceException 
	{
        Optional < Allergy > optional = allergyService.findById(allergyId);
		return optional;
		
	}
	
	
	
	
	
	
}
