package com.capstone.application.exception;

public class PatientHealthException extends Exception {

	private static final long serialVersionUID = 526706541554094375L;

	public PatientHealthException(String message) {
		super(message);
	}

	public PatientHealthException(String message, Throwable cause) {
		super(message, cause);
	}

	public PatientHealthException(Throwable cause) {
		super(cause);
	}
}
