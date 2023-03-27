package com.capstone.application.model;

import jakarta.persistence.*;

@Entity
@Table(name="nurseinfo")
public class NurseInfo {
	
	@Id
	@Column
	private String nurse_email;
	
	@Column
	private String first_Name;
	@Column
	private String last_Name;
	public NurseInfo() {
		super();
		// TODO Auto-generated constructor stub
	}
	public NurseInfo(String nurse_email, String first_Name, String last_Name) {
		super();
		this.nurse_email = nurse_email;
		this.first_Name = first_Name;
		this.last_Name = last_Name;
	}
	public String getNurse_email() {
		return nurse_email;
	}
	public void setNurse_email(String nurse_email) {
		this.nurse_email = nurse_email;
	}
	public String getFirst_Name() {
		return first_Name;
	}
	public void setFirst_Name(String first_Name) {
		this.first_Name = first_Name;
	}
	public String getLast_Name() {
		return last_Name;
	}
	public void setLast_Name(String last_Name) {
		this.last_Name = last_Name;
	}
	
	
	

}