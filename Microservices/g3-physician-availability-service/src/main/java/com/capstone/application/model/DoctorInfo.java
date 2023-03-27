package com.capstone.application.model;

import jakarta.persistence.*;

@Entity
@Table(name="doctorinfo")
public class DoctorInfo {
	@Id
	@Column
	String doctor_email;
	@Column
	String first_name;
	@Column
	String last_name;
	@Column
	String speciality;
	
	
	
	



	public DoctorInfo() {
		super();
	}



	public DoctorInfo(String doctor_email, String first_name, String last_name,String speciality) {
		super();
		this.doctor_email = doctor_email;
		this.first_name = first_name;
		this.last_name = last_name;
		this.speciality=speciality;
	}



	public String getDoctor_email() {
		return doctor_email;
	}



	public void setDoctor_email(String doctor_email) {
		this.doctor_email = doctor_email;
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
	
	
}
