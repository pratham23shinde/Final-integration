package com.capstone.application.service;


import java.net.MalformedURLException;

import org.springframework.beans.factory.annotation.Autowired;

import com.capstone.application.model.Auth0User;

public interface Auth0service  {

	void addUser(Auth0User auth0User)throws MalformedURLException;

	void deleteUser(String email);

	
}
