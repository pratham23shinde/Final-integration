package com.capstone.application.service.serviceImpl;

import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;

import org.springframework.stereotype.Service;

import com.capstone.application.model.Auth0User;
import com.capstone.application.service.Auth0service;

import kong.unirest.Unirest;

@Service
public class Auth0ServiceImpl implements Auth0service{
	private static final org.apache.logging.log4j.Logger log = org.apache.logging.log4j.LogManager.getLogger(Auth0service.class);

	
	
	@Override
	public void addUser(Auth0User auth0User) throws MalformedURLException {
		// TODO Auto-generated method stub
		kong.unirest.HttpResponse<String> response1 = Unirest.post("https://dev-qnzlgih035ihuldo.us.auth0.com/oauth/token")
				  .header("content-type", "application/json")
				  .body("{\"client_id\":\"mzd3nJojQh0Y0GfIUUv5De6Mq8HbHK1k\",\"client_secret\":\"nhOi6RhOIDbRf_nj5jnC8H-OX3sZvz573FJI5BdE5ozk96_hH3oYJm7A_mtq-voF\",\"audience\":\"https://dev-qnzlgih035ihuldo.us.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}")
				  .asString();
		
		String res=response1.getBody();
		StringBuilder storeToken=new StringBuilder();
		int runner=17;
		while(res.charAt(runner)!='"') {
			storeToken.append(res.charAt(runner));
			runner++;
		}
		String token=storeToken.toString();
		System.out.println(auth0User.getEmail());
		System.out.println(auth0User.getFirstName());
		System.out.println(auth0User.getLastName());
		System.out.println(auth0User.getPassword());
		System.out.println(auth0User.getRole());
		kong.unirest.HttpResponse<String> response2 = Unirest.post("https://dev-qnzlgih035ihuldo.us.auth0.com/api/v2/users")
				  .header("content-type", "application/json")
				  .header("Authorization","Bearer "+token)
				  .body("{\r\n"
				  		+ "  \"email\": \""+auth0User.getEmail()+"\",\r\n"
				  		+ " \r\n"
				  		+ "  \"user_metadata\": {\r\n"
				  		+ "  \"Role\": \""+auth0User.getRole()+"\",\r\n"
				  		+ "  \"FirstName\": \""+auth0User.getFirstName()+"\",\r\n"
				  		+ "  \"LastName\": \""+auth0User.getLastName()+"\",\r\n"
				  		+ "  \"Speciality\": \""+auth0User.getSpeciality()+"\"\r\n"
				  		+ "},\r\n"
				  		+ "  \r\n"
				  		+ "  \"user_id\": \""+auth0User.getEmail()+"\",\r\n"
				  		+ "  \"connection\": \"Username-Password-Authentication\",\r\n"
				  		+ "  \"password\": \""+auth0User.getPassword()+"\"\r\n"
				  		+ "  \r\n"
				  		+ " \r\n"
				  		+ "}")
				  .asString();
		
		//System.out.println(response2.getBody());
		
		String roles[]= {"rol_og7znRKxNmtAR1El","rol_JKOsKxfzc4k3ux3X","rol_X7xQ2IzHxzuyC5pX"};
		int role=0;
		if(auth0User.getRole().equals("Admin")) {
			role=0;
		}
		if(auth0User.getRole().equals("Doctor")) {
			role=1;
		}
		if(auth0User.getRole().equals("Nurse")) {
			role=2;
		}
		
		String assignRolesUrl="https://dev-qnzlgih035ihuldo.us.auth0.com/api/v2/users/auth0"+"|"+auth0User.getEmail()+"/roles";
		URL url = new URL(assignRolesUrl);
		
		kong.unirest.HttpResponse<String> response3 = Unirest.post("https://dev-qnzlgih035ihuldo.us.auth0.com/api/v2/users/{id}/roles")
					.routeParam("id","auth0|"+auth0User.getEmail())
				  .header("content-type", "application/json")
				  .header("Authorization","Bearer "+token)
				  .body("{\r\n"
				  		+ "  \"roles\": [\r\n"
				  		+ "    \""+roles[role]+"\"\r\n"
				  		+ "  ]\r\n"
				  		+ "}")
				  .asString();
		
		System.out.println(response3.getBody());
		
		log.info("Doctor added into Auth) successfully");
		
		//exception e if you throw any
		//log.error("Couldn't add doctor due to some error"+e);
	
	}

	
	@Override
	public void deleteUser(String email) {
		// TODO Auto-generated method stub
		
		kong.unirest.HttpResponse<String> response1 = Unirest.post("https://dev-qnzlgih035ihuldo.us.auth0.com/oauth/token")
				  .header("content-type", "application/json")
				  .body("{\"client_id\":\"mzd3nJojQh0Y0GfIUUv5De6Mq8HbHK1k\",\"client_secret\":\"nhOi6RhOIDbRf_nj5jnC8H-OX3sZvz573FJI5BdE5ozk96_hH3oYJm7A_mtq-voF\",\"audience\":\"https://dev-qnzlgih035ihuldo.us.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}")
				  .asString();
		
		String res=response1.getBody();
		StringBuilder storeToken=new StringBuilder();
		int runner=17;
		while(res.charAt(runner)!='"') {
			storeToken.append(res.charAt(runner));
			runner++;
		}
		String token=storeToken.toString();
		
		kong.unirest.HttpResponse<String> response2 = Unirest.delete("https://dev-qnzlgih035ihuldo.us.auth0.com/api/v2/users/"+URLEncoder.encode("auth0|")+email)
				.header("content-type", "application/json")  
				.header("Authorization","Bearer "+token)
				  .asString();
		
		log.info("Doctor deleted successfully of email "+email);
		
		//for exception e
		//log.error("Doctor couldn't be deleted of following email "+email);
		
	}
	
	
	
	
	
	
	
	
	
	

}
