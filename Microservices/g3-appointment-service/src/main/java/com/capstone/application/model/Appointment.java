package com.capstone.application.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="appointment")
public class Appointment 
{
	@Id
	@Column(name="appointment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int appointmentId;
	
	@Column(name="dr_FirstName")
	private String drFirstName;
	
	@Column(name="dr_LastName")
	private String drLastName;
	
	@Column(name="reason")
	private String reason;
	
	@Column(name="date")
	private String date;
	
	@Column(name="acceptance")
	private String acceptance;
	
	@Column(name="patient_id")
	private int patientId;
	
	@Column(name="patient_first_name")
	private String patientFirstName;
	
	@Column(name="patient_last_name")
	private String patientLastName;
	
	@Column(name="patient_title")
	private String patientTitle;
	
	@Column(name="physician_email")
	private String physicianEmail;
	
	@Column(name="submission_date")
	private String submissionDate;

	public int getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}

	public String getDrFirstName() {
		return drFirstName;
	}

	public void setDrFirstName(String drFirstName) {
		this.drFirstName = drFirstName;
	}

	public String getDrLastName() {
		return drLastName;
	}

	public void setDrLastName(String drLastName) {
		this.drLastName = drLastName;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getAcceptance() {
		return acceptance;
	}

	public void setAcceptance(String acceptance) {
		this.acceptance = acceptance;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public String getPatientFirstName() {
		return patientFirstName;
	}

	public void setPatientFirstName(String patientFirstName) {
		this.patientFirstName = patientFirstName;
	}

	public String getPatientLastName() {
		return patientLastName;
	}

	public void setPatientLastName(String patientLastName) {
		this.patientLastName = patientLastName;
	}

	public String getPatientTitle() {
		return patientTitle;
	}

	public void setPatientTitle(String patientTitle) {
		this.patientTitle = patientTitle;
	}

	public String getPhysicianEmail() {
		return physicianEmail;
	}

	public void setPhysicianEmail(String physicianEmail) {
		this.physicianEmail = physicianEmail;
	}

	public String getSubmissionDate() {
		return submissionDate;
	}

	public void setSubmissionDate(String submissionDate) {
		this.submissionDate = submissionDate;
	}

	public Appointment(int appointmentId, String drFirstName, String drLastName, String reason, String date,
			String acceptance, int patientId, String patientFirstName, String patientLastName, String patientTitle,
			String physicianEmail, String submissionDate) {
		super();
		this.appointmentId = appointmentId;
		this.drFirstName = drFirstName;
		this.drLastName = drLastName;
		this.reason = reason;
		this.date = date;
		this.acceptance = acceptance;
		this.patientId = patientId;
		this.patientFirstName = patientFirstName;
		this.patientLastName = patientLastName;
		this.patientTitle = patientTitle;
		this.physicianEmail = physicianEmail;
		this.submissionDate = submissionDate;
	}

	public Appointment() {
		super();
		// TODO Auto-generated constructor stub
	}

	 
	
	
	
}
