package com.capstone.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class GatewayServiceApplication {
	

	@Bean
	public RouteLocator serviceRoutes(RouteLocatorBuilder builder)
	{
		return builder.routes()
				.route(p->p
						.path("/api/v1/allergy-service/*")
						.uri("http://allergy-svc:9002/api/v1/*"))
				
				.route(p->p
						.path("/api/v1/appointment-service/*")
						.uri("http://appointment-svc:9003/api/v1/*"))
				
				.route(p->p
						.path("/api/v1/auth0-service/*")
						.uri("http://auth0-svc:9010/api/v1/*"))
				
				.route(p->p
						.path("/api/v1/authentication-service/*")
						.uri("http://authentication-svc:9004/api/v1/*"))
				
				.route(p->p
						.path("/api/v1/patient-health-record-service/*")
						.uri("http://patient-health-records-svc:9005/api/v1/*"))
				
				.route(p->p
						.path("/api/v1/patient-info-service/*")
						.uri("http://patient-info-svc:9006/api/v1/*"))
				
				.route(p->p
						.path("/api/v1/physician-availability-service/*")
						.uri("http://physician-availability-svc:9007/api/v1/*"))
				
				.route(p->p
						.path("/api/v1/smtp-service/*")
						.uri("http://SMTP-mailService-svc:8080/api/v1/*"))
			    .build();
	}
	
	
	public static void main(String[] args) {
		
		SpringApplication.run(GatewayServiceApplication.class, args);
		
	}

}
