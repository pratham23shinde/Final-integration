package com.capstone.application.service;

import java.util.List;
import java.util.Optional;

import com.capstone.application.model.Allergy;



public interface AllergyService 
{

	public List<Allergy> findAll();
	
	public Optional<Allergy> findById(Integer allergyId);
}
