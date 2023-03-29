package com.capstone.application;

import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import com.capstone.application.repository.PhysicianAvailabilityRepository;
import com.capstone.application.service.impl.PhysicianAvailabilityServiceImpl;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class PhysicianAvailabilityApplicationTests {

	@Mock private PhysicianAvailabilityRepository physiciainRepo;
	private PhysicianAvailabilityServiceImpl physicianService;
	
	@BeforeEach void setup()
	{
		this.physicianService=new PhysicianAvailabilityServiceImpl(this.physiciainRepo);
		
	}
	
	@Test
	public void DeletePhysician()
	{
		physicianService.deletePhysician("aakash.solanke@gmail.com");
		verify(physiciainRepo).deleteById("aakash.solanke@gmail.com");
	}
}
