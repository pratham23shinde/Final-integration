package com.email.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.email.model.Email;
import com.email.service.EmailService;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1")
public class Controller {
	
	@Autowired
	private  EmailService emailService;

	@PostMapping("/sendemail")
	public ResponseEntity<?> sendEmail(@RequestBody Email email){

		System.out.println(email);
		
		boolean result =this.emailService.sendEmail(email.getToMail(), email.getSubject(), email.getMessage());
		
		if(result) {
			return ResponseEntity.ok("Email is sent successfully.");
		}
		
		else {
			
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Email Not send");
		}
		
	}
}
