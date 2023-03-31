package com.capstone.application.exception;

public class PhysicianAvailabilityException extends Exception {

	private static final long serialVersionUID = 526706541554094375L;

	public PhysicianAvailabilityException(String message) {
		super(message);
	}

	public PhysicianAvailabilityException(String message, Throwable cause) {
		super(message, cause);
	}

	public PhysicianAvailabilityException(Throwable cause) {
		super(cause);
	}
}
