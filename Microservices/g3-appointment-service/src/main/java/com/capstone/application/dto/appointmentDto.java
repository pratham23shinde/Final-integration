package com.capstone.application.dto;

public class appointmentDto 
{
	private String patientId;
	private String date;
	private String reason;
	private String physicianEmail;
	private String submissonDate;
	public String getPatientId() {
		return patientId;
	}
	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getPhysicianEmail() {
		return physicianEmail;
	}
	public void setPhysicianEmail(String physicianEmail) {
		this.physicianEmail = physicianEmail;
	}
	public String getSubmissonDate() {
		return submissonDate;
	}
	public void setSubmissonDate(String submissonDate) {
		this.submissonDate = submissonDate;
	}
	
	
}
