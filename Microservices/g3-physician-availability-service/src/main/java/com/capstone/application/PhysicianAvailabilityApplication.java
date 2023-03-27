
package com.capstone.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories
public class PhysicianAvailabilityApplication {

	public static void main(String[] args) {
		SpringApplication.run(PhysicianAvailabilityApplication.class, args);
	}

}
