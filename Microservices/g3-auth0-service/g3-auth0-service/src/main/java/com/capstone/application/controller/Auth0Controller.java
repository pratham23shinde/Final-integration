package com.capstone.application.controller;


import java.net.MalformedURLException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.application.model.Auth0User;
import com.capstone.application.service.Auth0service;

import lombok.extern.log4j.Log4j2;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/api/v1/auth0-service")
@Log4j2
public class Auth0Controller {
	private static final org.apache.logging.log4j.Logger log = org.apache.logging.log4j.LogManager.getLogger(Auth0Controller.class);

	
	
	private Auth0service auth0service;
	
	public Auth0Controller(Auth0service auth0service) {
		super();
		this.auth0service = auth0service;
	}

	@PostMapping(path="addUser")
	void addUser(@RequestBody Auth0User auth0User)throws MalformedURLException {
		System.out.println(auth0User.getFirstName());
		System.out.println(auth0User.getLastName());
		System.out.println(auth0User.getRole());
		System.out.println(auth0User.getEmail());
		System.out.println(auth0User.getPassword());
		System.out.println(auth0User.getSpeciality());
		auth0service.addUser(auth0User);
		log.info("Doctor added into auth0");
		
		//for exceptions
		//log.error("Couldn't add doctor");
		
	}
	
	
	@DeleteMapping(path="deleteUser/{email}")
	void deleteUser(@PathVariable String email ) {
		System.out.println(email);
		auth0service.deleteUser(email);
		log.info("Doctor deleted from auth0");
		
		//for exceptions
		//log.error("Couldn't delete doctor of email"+email);
	}

}
