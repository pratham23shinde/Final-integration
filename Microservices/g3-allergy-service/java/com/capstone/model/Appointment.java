package com.capstone.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class Appointment 
{
	@Id
	@Column(name="appointment_id")
	private int appointmentId;
	
	@Column(name="reason")
	private String reason;
	
	@Column(name="date")
	private String date;
	
	@Column(name="acceptance")
	private String acceptance;
	
	@Column(name="patient_id")
	private int patientId;
	
	@Column(name="physician_email")
	private String physicianEmail;
	
	@Column(name="submission_date")
	private String submissionDate;
	
	

	public Appointment(int appointmentId, String reason, String date, String acceptance, int patientId,
			String physicianEmail, String submissionDate) {
		super();
		this.appointmentId = appointmentId;
		this.reason = reason;
		this.date = date;
		this.acceptance = acceptance;
		this.patientId = patientId;
		this.physicianEmail = physicianEmail;
		this.submissionDate = submissionDate;
	}

	public int getAppointmentId() {
		return appointmentId;
	}
	
	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
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

	@Override
	public String toString() {
		return "Appointment [appointmentId=" + appointmentId + ", reason=" + reason + ", date=" + date + ", acceptance="
				+ acceptance + ", patientId=" + patientId + ", physicianEmail=" + physicianEmail + ", submissionDate="
				+ submissionDate + "]";
	}
	
	
	
}
