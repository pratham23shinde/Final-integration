package com.capstone.application;

import org.modelmapper.ModelMapper;
//import org.apache.catalina.filters.CorsFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class PatientInfoServiceApplication {

	
	public static void main(String[] args) {
		SpringApplication.run(PatientInfoServiceApplication.class, args);
	}


	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();

	}

}
