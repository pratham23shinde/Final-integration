package com.capstone.application.service.impl;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.capstone.application.exception.AllergyServiceException;
import com.capstone.application.model.Allergy;
import com.capstone.application.repository.AllergyRepository;
import com.capstone.application.service.AllergyService;

import lombok.extern.log4j.Log4j2;



@Service
@Log4j2
public class AllergyServiceImpl implements AllergyService {
	private static final org.apache.logging.log4j.Logger log = org.apache.logging.log4j.LogManager.getLogger(AllergyServiceImpl.class);

	
	private AllergyRepository allergyRepository;
	
	
	
	public AllergyServiceImpl(AllergyRepository allergyRepository) {
		super();
		this.allergyRepository = allergyRepository;
	}	

	@Override
	public List<Allergy> findAll() throws AllergyServiceException{
		// TODO Auto-generated method stub
		
		List<Allergy> result= allergyRepository.findAll();
		log.info("Allergy List:"+result);
		if(result.size()==0) {
			log.error("Couldn't find any allergy in the databse");	
			throw new AllergyServiceException("No Allergy found in the Database");
		}
		
		
		return result;
		
		
	}

	@Override
	public Optional<Allergy> findById(Integer allergyId) throws AllergyServiceException{

		Optional<Allergy> result = allergyRepository.findById(allergyId);
		log.info("Allergy by id found:"+result);
		System.out.println(result);
		if(result.isEmpty()) {
			log.error("Couldn't find allergy by the id"+allergyId);
			throw new AllergyServiceException("No Allergy found with ID "+allergyId);
		}
		else {
		return result;
		}
	}

}
