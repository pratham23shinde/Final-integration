package com.capstone.application.exception;

public class PatientInfoException extends Exception {

	private static final long serialVersionUID = 526706541554094375L;

	public PatientInfoException(String message) {
		super(message);
	}

	public PatientInfoException(String message, Throwable cause) {
		super(message, cause);
	}

	public PatientInfoException(Throwable cause) {
		super(cause);
	}
}
