package com.capstone.application.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="physician_availability",schema="physician_availability_db")
public class PhysicianAvailabiityModel 
{
	@Id
	@Column(name="physician_email")
	private String physicianEmail;
	
	@Column(name="first_Name")
	private String first_name;
	
	
	@Column(name="last_name")
	private String last_name;
	
	
	@Column(name="speciality")
	private String speciality;
	
	@Column(name="start_date")
	private String startDate;
	
	@Column(name="end_date")
	private String endDate;
	
	@Column(name="availability")
	private boolean availability;

	public PhysicianAvailabiityModel() {
		super();
	}

	public PhysicianAvailabiityModel(String physicianEmail, String first_name, String last_name, String speciality,
			String startDate, String endDate, boolean availability) {
		super();
		this.physicianEmail = physicianEmail;
		this.first_name = first_name;
		this.last_name = last_name;
		this.speciality = speciality;
		this.startDate = startDate;
		this.endDate = endDate;
		this.availability = availability;
	}

	public String getPhysicianEmail() {
		return physicianEmail;
	}

	public void setPhysicianEmail(String physicianEmail) {
		this.physicianEmail = physicianEmail;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getSpeciality() {
		return speciality;
	}

	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public boolean isAvailability() {
		return availability;
	}

	public void setAvailability(boolean availability) {
		this.availability = availability;
	}

	
	
	
	
	
	
	
}
