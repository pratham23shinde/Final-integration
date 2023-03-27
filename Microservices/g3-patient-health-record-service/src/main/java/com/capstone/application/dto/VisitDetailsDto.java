package com.capstone.application.dto;

public class VisitDetailsDto {

	private int patientId;
	private float height;
	private float weight;
	private int BPsystolic;
	private int BPdiastolic;
	private float bodyTemperature;
	private int repirationRate;
	private String bloodGroup;
	private String nurseEmail;
	private String physicianEmail;
	private String keyNotes;
	private int appointmentId;
	
	
	public int getPatientId() {
		return patientId;
	}
	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}
	public float getHeight() {
		return height;
	}
	public void setHeight(float height) {
		this.height = height;
	}
	public float getWeight() {
		return weight;
	}
	public void setWeight(float weight) {
		this.weight = weight;
	}
	public int getBPsystolic() {
		return BPsystolic;
	}
	public void setBPsystolic(int bPsystolic) {
		BPsystolic = bPsystolic;
	}
	public int getBPdiastolic() {
		return BPdiastolic;
	}
	public void setBPdiastolic(int bPdiastolic) {
		BPdiastolic = bPdiastolic;
	}
	public float getBodyTemperature() {
		return bodyTemperature;
	}
	public void setBodyTemperature(float bodyTemperature) {
		this.bodyTemperature = bodyTemperature;
	}
	public int getRepirationRate() {
		return repirationRate;
	}
	public void setRepirationRate(int repirationRate) {
		this.repirationRate = repirationRate;
	}
	public String getBloodGroup() {
		return bloodGroup;
	}
	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}
	public String getNurseEmail() {
		return nurseEmail;
	}
	public void setNurseEmail(String nurseEmail) {
		this.nurseEmail = nurseEmail;
	}
	public String getPhysicianEmail() {
		return physicianEmail;
	}
	public void setPhysicianEmail(String physicianEmail) {
		this.physicianEmail = physicianEmail;
	}
	public String getKeyNotes() {
		return keyNotes;
	}
	public void setKeyNotes(String keyNotes) {
		this.keyNotes = keyNotes;
	}
	
	public int getAppointmentId() {
		return appointmentId;
	}
	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}
}
