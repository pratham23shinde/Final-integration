package com.capstone.application.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="patient", schema="patient_info_db")
public class Patient 
{
	@Id
	@Column(name="patient_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int patientId;
	
	@Column(name="email")
	private String email;
	
	@Column(name="title")
	private String title;
	
	@Column(name="first_name")
	private String firstName;
	
	@Column(name="last_name")
	private String lastName;
	
	@Column(name="dob")
	private String dob;
	
	@Column(name="contact_number")
	private String contactNumber;
	
	@Column(name="password")
	private String password;
	
	@Column(name="gender")
	private char gender;
	
	@Column(name="address")
	private String address;
	
}
