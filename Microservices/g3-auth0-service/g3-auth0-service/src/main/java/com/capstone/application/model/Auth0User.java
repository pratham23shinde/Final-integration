package com.capstone.application.model;

public class Auth0User {
	String email;
	String password;
	String role;
	String firstName;
	String lastName;
	String speciality;
	public Auth0User() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Auth0User(String email, String password, String role, String firstName, String lastName, String speciality) {
		super();
		this.email = email;
		this.password = password;
		this.role = role;
		this.firstName = firstName;
		this.lastName = lastName;
		this.speciality = speciality;
	}
	@Override
	public String toString() {
		return "Auth0User [email=" + email + ", password=" + password + ", role=" + role + ", firstName=" + firstName
				+ ", lastName=" + lastName + ", speciality=" + speciality + "]";
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getSpeciality() {
		return speciality;
	}
	public void setSpeciality(String speciality) {
		this.speciality = speciality;
	}
	
	
}
	
	