package com.email;

import java.util.Arrays;

import org.apache.catalina.filters.CorsFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@SpringBootApplication
public class G1SmtpMailServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(G1SmtpMailServiceApplication.class, args);
	}

}
