package com.capstone.application.exception;

public class AuthenticationException extends Exception {

	private static final long serialVersionUID = 526706541554094375L;

	public AuthenticationException(String message) {
		super(message);
	}

	public AuthenticationException(String message, Throwable cause) {
		super(message, cause);
	}

	public AuthenticationException(Throwable cause) {
		super(cause);
	}
}
