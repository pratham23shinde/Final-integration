package com.capstone.application.service;

import java.util.List;

import com.capstone.application.model.PhysicianAvailabiityModel;

public interface PhysicianAvailabilityService {
	public List<PhysicianAvailabiityModel> findAll();
    public PhysicianAvailabiityModel update(PhysicianAvailabiityModel physicianAvailabiity);

    public boolean deletePhysician(String physicianEmail);
	public void postDoctors() throws Throwable, Exception;
	public List<PhysicianAvailabiityModel> findAllPhysicianOnDate(String date);

}
