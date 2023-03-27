package com.capstone.application.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "prescription",schema = "patient_info_db")
public class Prescription 
{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "prescription_id")
	private int prescriptionId;
	
	@Column(name = "prescription_name")
	private String prescriptionName;
	
	private String dosage;
	
	@Column(name = "prescription_notes")
	private String prescriptionNotes;
	
	@Column(name = "visit_id")
	private int visitId;

	public Prescription() {
		super();
	}

	public Prescription(int prescriptionId, String prescriptionName, String dosage, String prescriptionNotes,
			int visitId) {
		super();
		this.prescriptionId = prescriptionId;
		this.prescriptionName = prescriptionName;
		this.dosage = dosage;
		this.prescriptionNotes = prescriptionNotes;
		this.visitId = visitId;
	}

	public int getPrescriptionId() {
		return prescriptionId;
	}

	public void setPrescriptionId(int prescriptionId) {
		this.prescriptionId = prescriptionId;
	}

	public String getPrescriptionName() {
		return prescriptionName;
	}

	public void setPrescriptionName(String prescriptionName) {
		this.prescriptionName = prescriptionName;
	}

	public String getDosage() {
		return dosage;
	}

	public void setDosage(String dosage) {
		this.dosage = dosage;
	}

	public String getPrescriptionNotes() {
		return prescriptionNotes;
	}

	public void setPrescriptionNotes(String prescriptionNotes) {
		this.prescriptionNotes = prescriptionNotes;
	}

	public int getVisitId() {
		return visitId;
	}

	public void setVisitId(int visitId) {
		this.visitId = visitId;
	}
	
	
}
