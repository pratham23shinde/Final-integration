package com.capstone.application.service;

import java.util.List;
import java.util.Optional;
import com.capstone.application.model.Patient;

public interface PatientInfoService 
{

	public List<Patient> findAll();
	public Optional<Patient> findById(Integer patientId);
    public Patient update(Patient patient);
    
    //aaksh
    public Optional<Patient> findByIdData(Integer patientId);



}
