


package com.capstone.application;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.hamcrest.CoreMatchers.is;

import static org.mockito.ArgumentMatchers.any;

import static org.mockito.Mockito.*;

import java.util.*;

import org.junit.jupiter.api.BeforeEach;

import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;

import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.boot.test.mock.mockito.MockBean;

import org.springframework.test.web.servlet.MockMvc;

import org.springframework.test.web.servlet.ResultMatcher;

import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import org.springframework.web.context.WebApplicationContext;

import com.capstone.application.controller.PhysicianAvailabilityControllers;

import com.capstone.application.model.PhysicianAvailabiityModel;

import com.capstone.application.service.PhysicianAvailabilityService;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.HttpStatus;

import org.springframework.http.MediaType;

@SpringBootTest

@ExtendWith(MockitoExtension.class)

class PhysicianAvailabilityApplicationTests {

@InjectMocks

PhysicianAvailabilityControllers physicianAvailabilityControllers;

@MockBean

private PhysicianAvailabilityService physicianAvailabilityService;

@Autowired

private WebApplicationContext webApplicationContext;

private MockMvc mockMvc;

@Autowired

private ObjectMapper objectMapper;

private PhysicianAvailabiityModel pA1;

private PhysicianAvailabiityModel pA2;

@BeforeEach

void setup() {

//this.allergyService=new AllergyServiceImpl(this.allergyRepo);

mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

pA1=new PhysicianAvailabiityModel();

pA1.setPhysicianEmail("abcd@gmail.com");

pA1.setFirst_name("ab");

pA1.setLast_name("cd");

pA1.setAvailability(true);

pA1.setStartDate("21/03/2023");

pA1.setEndDate("24/03/2023");

}

@Test

void AvailablePhysician() throws Exception {

List<PhysicianAvailabiityModel> list = new ArrayList<>();

list.add(pA1);

when(physicianAvailabilityService.findAll()).thenReturn(list);

this.mockMvc.perform(get("http://localhost:9007/api/v1/physician-availability"))

.andExpect(status().isOk())

.andExpect(jsonPath("$.size()", is(list.size())));

}

@Test

void AvailablePhysician1() throws Exception {

List<PhysicianAvailabiityModel> list = new ArrayList<>();

list.add(pA1);

when(physicianAvailabilityService.findAll()).thenReturn(list);

this.mockMvc.perform(get("http://localhost:9007/api/v1/physician-avail?availability=true"))

.andExpect(status().isOk())

.andExpect(jsonPath("$.[0].availability", is(true)));

}

@Test

void updatedPhysicianAvailabilitys() throws Exception {

when(physicianAvailabilityService.update(any(PhysicianAvailabiityModel.class))).thenReturn(pA1);

this.mockMvc.perform(put("http://localhost:9007/api/v1/physician-availability")

.contentType(MediaType.APPLICATION_JSON)

.content(objectMapper.writeValueAsString(pA1)))

.andExpect(status().isOk());

}

@Test

void deletePhysicianAvailability() throws Exception {

when(physicianAvailabilityService.deletePhysician(any())).thenReturn(true);

this.mockMvc.perform(delete("http://localhost:9007/api/v1/physician-availability/{physicianEmail}", "abcd@gmail.com"))

.andExpect(status().isOk());

}

@Test

void AvailablePhysicianOnthatDate() throws Exception {

List<PhysicianAvailabiityModel> list = new ArrayList<>();

list.add(pA1);

when(physicianAvailabilityService.findAllPhysicianOnDate(any())).thenReturn(list);

this.mockMvc.perform(get("http://localhost:9007/api/v1/physician-available/OnthatDate/{date}","21-03-2023"))

.andExpect(status().isOk())

.andExpect(jsonPath("$.[0].startDate", is(pA1.getStartDate())))

.andExpect(jsonPath("$.size()", is(list.size())));

}

@Test

void findDoctorInfoByEmail() throws Exception {

Optional<PhysicianAvailabiityModel> x=Optional.ofNullable(pA1);

when(physicianAvailabilityService.findDoctorInfoByEmailId(any())).thenReturn(x);

this.mockMvc.perform(get("http://localhost:9007/api/v1/doctorInfo/{email}", "abcd@gmail.com"))

.andExpect(status().isOk())

.andExpect(jsonPath("$.first_Name", is(pA1.getFirst_name())))

.andExpect(jsonPath("$.last_name", is(pA1.getLast_name())))

.andExpect(jsonPath("$.physicianEmail", is(pA1.getPhysicianEmail())));

}

}

