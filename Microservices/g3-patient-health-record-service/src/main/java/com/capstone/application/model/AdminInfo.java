package com.capstone.application.model;

import jakarta.persistence.*;

@Entity
@Table(name="admininfo")
public class AdminInfo {
	
	@Id
	@Column
	String admin_email;
	@Column
	String first_Name;
	@Column
	String last_Name;
	
	public AdminInfo() {
		super();
	}

	public AdminInfo(String admin_email, String first_Name, String last_Name) {
		super();
		this.admin_email = admin_email;
		this.first_Name = first_Name;
		this.last_Name = last_Name;
	}

	public String getAdmin_email() {
		return admin_email;
	}

	public void setAdmin_email(String admin_email) {
		this.admin_email = admin_email;
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
