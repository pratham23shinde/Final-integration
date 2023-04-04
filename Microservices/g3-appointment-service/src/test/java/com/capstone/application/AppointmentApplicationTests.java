package com.capstone.application;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.capstone.application.controller.AppointmentController;

import com.capstone.application.dto.appointmentDto;
import com.capstone.application.model.Appointment;

import com.capstone.application.repository.AppointmentRepository;

import com.capstone.application.service.impl.AppointmentServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.capstone.application.service.AppointmentService;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class AppointmentApplicationTests {
	
	@InjectMocks
	AppointmentController appointmentController;

	
	@MockBean
	private AppointmentService appointmentService;
	
	
	
	
	
	 @Autowired
	  private WebApplicationContext webApplicationContext;
	  private MockMvc mockMvc;

	  
	@Autowired
	private ObjectMapper objectMapper;
	
	
	private Appointment aP1;
	
	@BeforeEach
	void setup() {

		
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
		
		aP1=new Appointment();
		aP1.setAppointmentId(1);
		aP1.setDate("12-03-2023");
		aP1.setPhysicianEmail("abcd@gmail.com");
		
		
		
	}
	
	@Test
	void allAppointmentsForPatientId() throws Exception {
		
		List<Appointment>list=new ArrayList<>();
		list.add(aP1);
		
		when(appointmentService.findAppointmentsByAppointmentId(anyInt())).thenReturn(list);
		
		
		this.mockMvc.perform(get("http://localhost:9003/api/v1/appointments/{appointmentId}",1))
		.andExpect(status().isOk());
	}
	
	@Test
	void appointmentsByAppointmentId() throws Exception {
		
		List<Integer>list=new ArrayList<>();
		list.add(1);
		
		when(appointmentService.findAllAppointmentsByPatientId(anyInt())).thenReturn(list);
		
		
		this.mockMvc.perform(get("http://localhost:9003/api/v1/patient/{patientId}/allappointments",1))
		.andExpect(status().isOk());
	}
	
	
	@Test
	void appointmetForPatientId() throws Exception {
		
		List<Appointment>list=new ArrayList<>();
		list.add(aP1);
		
		when(appointmentService.findByAppointmentById(anyInt())).thenReturn(list);
		
		
		this.mockMvc.perform(get("http://localhost:9003/api/v1/patient/{patientId}/appointments",1))
		.andExpect(status().isOk());
	}
	
	
	@Test
	void AcceptedAppointmentByEmailandDate() throws Exception {
		
		List<Appointment>list=new ArrayList<>();
		list.add(aP1);
		
		when(appointmentService.findByAppointmentByPEmailandDate(any(),any(),any())).thenReturn(list);
		
		
		this.mockMvc.perform(get("http://localhost:9003/api/v1/appointment/{physicianEmail}/{date}?acceptance=true","abcd@gmail.com","12-03-2023"))
		.andExpect(status().isOk());
	}
	
	
	@Test
	void pendingAppointmentByEmail() throws Exception {
		
		List<Appointment>list=new ArrayList<>();
		list.add(aP1);
		
		when(appointmentService.findByAppointmentByPEmail(any(),any())).thenReturn(list);
		
		
		this.mockMvc.perform(get("http://localhost:9003/api/v1/appointment/{physicianEmail}?acceptance=true","abcd@gmail.com"))
		.andExpect(status().isOk());
	}
	
	@Test
	void acceptedAppointmentForNurse() throws Exception {
		
		List<Appointment>list=new ArrayList<>();
		list.add(aP1);
		
		when(appointmentService.findByAcceptedAppointment(any())).thenReturn(list);
		
		
		this.mockMvc.perform(get("http://localhost:9003/api/v1/appointments?acceptance=true"))
		.andExpect(status().isOk());
	}
	
	@Test
	void updatePrescription() throws Exception {
		
		when(appointmentService.saveAppointment(any(Appointment.class))).thenReturn(aP1);
		
		this.mockMvc.perform(post("http://localhost:9003/api/v1/appointment")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(aP1)))
		.andExpect(status().isOk());
			
	}
	
	
	@Test
	void updatedPhysicianAvailabilitys() throws Exception {
		
		when(appointmentService.update(any(Appointment.class))).thenReturn(aP1);		
		this.mockMvc.perform(put("http://localhost:9003/api/v1/appointments/{appointmentId}",aP1)
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(aP1)))
		.andExpect(status().isOk());
	}
	
	
	@Test
	void deletePrescriptionById() throws Exception {
		
		when(appointmentService.deleteAppointment(anyInt())).thenReturn(true);
		
		this.mockMvc.perform(delete("http://localhost:9005/api/v1/appointment/{appointmentId}", 1))
			.andExpect(status().isOk());
			
	}
	
	
	
	@Test
	void updatedPhysicianAvailabilitys1() throws Exception {
		
		doNothing().when(appointmentService).updateByID(anyInt(),any());		
		this.mockMvc.perform(put("http://localhost:9003/api/v1/appointments/{appointmentId}/{status}",1,"accepted")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(aP1)))
		.andExpect(status().isOk());
	}
	
	
	@Test
	void rejectAppointment() throws Exception {
		
		doNothing().when(appointmentService).updateByID(anyInt(),any());		
		this.mockMvc.perform(put("http://localhost:9003/api/v1/rejectedappointments/{appointmentId}/{status}",1,"rejected")
				.contentType(MediaType.APPLICATION_JSON)
				.content(objectMapper.writeValueAsString(aP1)))
		.andExpect(status().isOk());
	}
	
	
	@Test
	void previousAppointment() throws Exception {
		
		
		
		when(appointmentService.findPreviousAppointmentByPatientId(anyInt())).thenReturn(aP1);
		
		
		this.mockMvc.perform(get("http://localhost:9003/api/v1/appointment/{patientId}/previous",1))
		.andExpect(status().isOk());
	}
	
	
	@Test
	void appointmentCount() throws Exception {
		
		
		
		when(appointmentService.countAppointments()).thenReturn(2L);
		
		
		this.mockMvc.perform(get("http://localhost:9003/api/v1/appointmentCount"))
		.andExpect(status().isOk());
	}
	
	
	@Test
	void AcceptedAppointmentByDate() throws Exception {
		
		List<Appointment>list=new ArrayList<>();
		list.add(aP1);
		
		when(appointmentService.findAppointmentByDate(any(),any())).thenReturn(list);
		
		
		this.mockMvc.perform(get("http://localhost:9003/api/v1/appointment/nurse/{date}?acceptance=accepted","12-03-2023"))
		.andExpect(status().isOk());
	}
	

}
