package com.capstone.application.exception;

public class AllergyServiceException extends Exception {

	private static final long serialVersionUID = 526706541554094375L;

	public AllergyServiceException(String message) {
		super(message);
	}

	public AllergyServiceException(String message, Throwable cause) {
		super(message, cause);
	}

	public AllergyServiceException(Throwable cause) {
		super(cause);
	}
}
