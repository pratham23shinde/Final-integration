package com.capstone.application.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name ="test", schema="paitent_info_db")
public class Tests 
{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "test_id")
	private int testId;
	
	@Column(name = "test_name")
	private String testName;
	
	private String result;
	
	@Column(name = "test_notes")
	private String testNotes;
	
	@Column(name = "visit_id")
	private int visitId;

	public Tests() {
		super();
	}

	public Tests(int testId, String testName, String result, String testNotes, int visitId) {
		super();
		this.testId = testId;
		this.testName = testName;
		this.result = result;
		this.testNotes = testNotes;
		this.visitId = visitId;
	}

	public int getTestId() {
		return testId;
	}

	public void setTestId(int testId) {
		this.testId = testId;
	}

	public String getTestName() {
		return testName;
	}

	public void setTestName(String testName) {
		this.testName = testName;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getTestNotes() {
		return testNotes;
	}

	public void setTestNotes(String testNotes) {
		this.testNotes = testNotes;
	}

	public int getVisitId() {
		return visitId;
	}

	public void setVisitId(int visitId) {
		this.visitId = visitId;
	}
	
	
}
