package com.capstone.application;


import static org.hamcrest.CoreMatchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.capstone.application.controller.AllergyController;
import com.capstone.application.exception.AllergyServiceException;
import com.capstone.application.model.Allergy;
import com.capstone.application.repository.AllergyRepository;
import com.capstone.application.service.AllergyService;
import com.capstone.application.service.impl.AllergyServiceImpl;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class AllergyServiceApplicationTests {
	
	@InjectMocks
	AllergyController allergyController;
	
	@Mock private AllergyRepository allergyRepo;
	private AllergyServiceImpl allergyService1;
	
	@MockBean
	private AllergyService allergyService;
	
	 @Autowired
	  private WebApplicationContext webApplicationContext;
	  private MockMvc mockMvc;

	  
	
	private Allergy drug;
	private Optional<Allergy> food;

	
	
	
	@BeforeEach
	void setup() {
		//this.allergyService=new AllergyServiceImpl(this.allergyRepo);
		
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
		
		drug=new Allergy();
		drug.setAllergyId(1);
		drug.setAllergyName("Drug");
		drug.setAllergyNotes("Allergy of drug");
		
		food=Optional.of(new Allergy());
		drug.setAllergyId(2);
		drug.setAllergyName("food");
		drug.setAllergyNotes("Allergy of food");
		
	}
	
	@BeforeEach
	void setups()
	{
		this.allergyService1=new AllergyServiceImpl(this.allergyRepo);
	}
	
	
	@Test
	void getAllergyList()
	{
		try {
			allergyService1.findAll();
		} catch (AllergyServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		verify(allergyRepo).findAll();
		
	}
	
	@Test
	void getAllergybyId()
	{
		try {
			allergyService1.findById(1);
		} catch (AllergyServiceException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		verify(allergyRepo).findById(1);
		
	}
	
	
	@Test
	void allergyList() throws Exception {
		List<Allergy> list = new ArrayList<>();
		list.add(drug);
		
		
		when(allergyService.findAll()).thenReturn(list);
		
		this.mockMvc.perform(get("http://localhost:9002/api/v1/allergyList")).andExpect(status().isOk())
		.andExpect(jsonPath("$.size()", is(list.size())));
		
	}
	
	@Test
	void allergybyId() throws Exception {
		
		Optional<Allergy> x=Optional.ofNullable(drug);
		when(allergyService.findById(any())).thenReturn(x);
		this.mockMvc.perform(get("http://localhost:9002/api/v1/allergy/{allergyId}", 1))
		.andExpect(status().isAccepted())
		.andExpect(jsonPath("$.allergyId", is(drug.getAllergyId())))
		.andExpect(jsonPath("$.allergyName", is(drug.getAllergyName())))
		.andExpect(jsonPath("$.allergyNotes", is(drug.getAllergyNotes())));
	}

	
}
