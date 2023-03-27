package com.capstone.application.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="allergy",schema="allergy_database")
public class Allergy 
{
	@Id
	@Column(name="allergy_id")
	private int allergyId;
	
	@Column(name="allergy_name")
	private String allergyName;
	
	@Column(name="allergy_notes")
	private String allergyNotes;

	
	
	
	
	public Allergy() {
		super();
	}

	public Allergy(int allergyId, String allergyName, String allergyNotes) {
		super();
		this.allergyId = allergyId;
		this.allergyName = allergyName;
		this.allergyNotes = allergyNotes;
	}

	public int getAllergyId() {
		return allergyId;
	}

	public void setAllergyId(int allergyId) {
		this.allergyId = allergyId;
	}

	public String getAllergyName() {
		return allergyName;
	}

	public void setAllergyName(String allergyName) {
		this.allergyName = allergyName;
	}

	public String getAllergyNotes() {
		return allergyNotes;
	}

	public void setAllergyNotes(String allergyNotes) {
		this.allergyNotes = allergyNotes;
	}

	@Override
	public String toString() {
		return "Allergy [allergyId=" + allergyId + ", allergyName=" + allergyName + ", allergyNotes=" + allergyNotes
				+ "]";
	}
	
	
}
