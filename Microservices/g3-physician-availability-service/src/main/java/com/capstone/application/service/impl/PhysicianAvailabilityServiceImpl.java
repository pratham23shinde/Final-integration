package com.capstone.application.service.impl;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.application.model.PhysicianAvailabiityModel;
import com.capstone.application.repository.DoctorInfoRepo;
import com.capstone.application.repository.PhysicianAvailabilityRepository;
import com.capstone.application.service.PhysicianAvailabilityService;

import kong.unirest.Unirest;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class PhysicianAvailabilityServiceImpl implements PhysicianAvailabilityService{
	
	private PhysicianAvailabilityRepository physicianAvailabilityRepository;
	
	@Autowired
	private DoctorInfoRepo doctorInfoRepo;


	public PhysicianAvailabilityServiceImpl(PhysicianAvailabilityRepository physicianAvailabilityRepository) {
		super();
		this.physicianAvailabilityRepository = physicianAvailabilityRepository;
	}
	
	
private boolean setTodaysAvailbility(PhysicianAvailabiityModel physicianAvailabiity,String cstartDate,String cendDate) throws ParseException {
		
		
		PhysicianAvailabiityModel model = null;
		
		LocalDate timeNow=LocalDate.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-YYYY");
        String today=formatter.format(timeNow).toString();
	
		
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
		Date currentDate=sdf.parse(today); 
		Date startdate = sdf.parse(cstartDate);  
		Date enddate = sdf.parse(cendDate); 
		int sD=currentDate.compareTo(startdate);
		int eD=currentDate.compareTo(enddate);
		
		
		
		
		
		if(sD>=0 && eD<=0) {
			return true;
		}
		else {
			return false;
		}
		
		
	}
	
private void setTodaysAvailbilityForAll() throws ParseException {
	
	
	PhysicianAvailabiityModel model = null;
	boolean nullCheck=false;
	List<PhysicianAvailabiityModel>l=physicianAvailabilityRepository.findAll();
	for(PhysicianAvailabiityModel p:l) {
		LocalDate timeNow=LocalDate.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-YYYY");
        String today=formatter.format(timeNow).toString();
        
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
		Date currentDate=sdf.parse(today); 
		Date startdate = sdf.parse(p.getStartDate());  
		Date enddate = sdf.parse(p.getEndDate()); 
		int sD=currentDate.compareTo(startdate);
		int eD=currentDate.compareTo(enddate);
        
        
        
        
		
		if(sD>=0 && eD<=0) {
			p.setAvailability(true);
			model=p;
		}
		else {
			p.setAvailability(false);
			model=p;
		}
		
	}
	if(nullCheck==false) {
	physicianAvailabilityRepository.save(model);
	}
	
}
	

@Override
public List<PhysicianAvailabiityModel> findAll() {
	//List<PhysicianAvailabiityModel>l=physicianAvailabilityRepository.findAll();
	try {
		setTodaysAvailbilityForAll();
	} catch (ParseException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	return physicianAvailabilityRepository.findAll();
	
}
	
public PhysicianAvailabiityModel update(PhysicianAvailabiityModel physicianAvailabiity) {
	PhysicianAvailabiityModel p=physicianAvailabiity;
	List<PhysicianAvailabiityModel>l=physicianAvailabilityRepository.findAll();
	for(PhysicianAvailabiityModel i:l) {
		if(i.getPhysicianEmail().equals(physicianAvailabiity.getPhysicianEmail())) {
			p=i;
			break;
			
		}
	}
	
	p.setStartDate(physicianAvailabiity.getStartDate());
	p.setEndDate(physicianAvailabiity.getEndDate());
	
	
	boolean val=true;
	try {
		val = setTodaysAvailbility(p,p.getStartDate(),p.getEndDate());
	} catch (ParseException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	p.setAvailability(val);
	
	
	PhysicianAvailabiityModel updateResponse = physicianAvailabilityRepository.save(p);
    return updateResponse;
}

	@Override
	public boolean deletePhysician(String physicianEmail) {
		physicianAvailabilityRepository.deleteById(physicianEmail);
		return true;
	}
	
	
	
	
	
	
	
	
	
	@Override
	public void postDoctors() throws Throwable, Exception {
		
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
		
		
		
		
		
		URI uri=URI.create("https://dev-qnzlgih035ihuldo.us.auth0.com/api/v2/users?email.domail:gmail.com/");
		HttpClient client=HttpClient.newHttpClient();

		HttpRequest request=HttpRequest.newBuilder()
				.GET()
				.uri(uri)
				.header("Authorization","Bearer "+token)
				.build();
		
		HttpResponse<String> response=client.send(request, HttpResponse.BodyHandlers.ofString(StandardCharsets.UTF_8));
		
		//System.out.println(response.body());
		String s=response.body();
		//System.out.println(s.charAt(0));
		
		ArrayList<String> emails = new ArrayList<>();
		ArrayList<String> firstName = new ArrayList<>();
		ArrayList<String> lastName = new ArrayList<>();
		ArrayList<String> speciality = new ArrayList<>();
		ArrayList<String> role = new ArrayList<>();

        Matcher matcher = Pattern.compile("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}").matcher(s);
       while (matcher.find()) {
    	   if(emails.contains(matcher.group())) {
    		   continue;
    	   }else {
    		   //System.out.println(matcher.group());
    		   emails.add(matcher.group());
    	   }
       }

       
       for(int i=2;i<s.length()-3;i++) {
    	   
    	   
    	   //For First-Name
    	   if(s.charAt(i)=='r' && s.charAt(i-1)=='i' && s.charAt(i-2)=='F') {
    		   int x=i;
    		   x+=10;
    		   StringBuilder sb=new StringBuilder();
    		   while(s.charAt(x)!='"') {
    			   sb.append(s.charAt(x));
    			   x++;
    		   }
    		   //System.out.println(sb.toString());
    		   firstName.add(sb.toString());
    	   }
    	   
    	   
    	   
    	   
    	   //For Last-Name
    	   if(s.charAt(i)=='s' && s.charAt(i-1)=='a' && s.charAt(i-2)=='L') {
    		   int x=i;
    		   x+=9;
    		   StringBuilder sb=new StringBuilder();
    		   while(s.charAt(x)!='"') {
    			   sb.append(s.charAt(x));
    			   x++;
    		   }
    		   //System.out.println(sb.toString());
    		   lastName.add(sb.toString());
    	   }
    	   
    	   
    	   
    	   
    	   //For Specialty
    	   if(s.charAt(i)=='e' && s.charAt(i-1)=='p' && s.charAt(i-2)=='S') {
    		   int x=i;
    		   x+=11;
    		   StringBuilder sb=new StringBuilder();
    		   while(s.charAt(x)!='"') {
    			   sb.append(s.charAt(x));
    			   x++;
    		   }
    		   //System.out.println(sb.toString());
    		   speciality.add(sb.toString());
    	   }
    	   
    	   
    	   
    	 //For Role
    	   if(s.charAt(i)=='l' && s.charAt(i-1)=='o' && s.charAt(i-2)=='R') {
    		   int x=i;
    		   x+=5;
    		   StringBuilder sb=new StringBuilder();
    		   while(s.charAt(x)!='"') {
    			   sb.append(s.charAt(x));
    			   x++;
    		   }
    		   
    		   //System.out.println(sb.toString());
    		   role.add(sb.toString());
    		   
    	   }
    	   
    	   
       }
       
       
       for(int i=0;i<emails.size();i++) {
    	   
LocalDate timeNow=LocalDate.now();
   
    	   if(role.get(i).equals("Doctor") ) {
    		   int x=physicianAvailabilityRepository.isValuePresent(emails.get(i));
    		   if(x==0) {
    	   //System.out.println(firstName.get(i)+"  "+lastName.get(i)+"  "+emails.get(i));
    	   PhysicianAvailabiityModel doc=new PhysicianAvailabiityModel();
    	   doc.setPhysicianEmail(emails.get(i));
    	   doc.setFirst_name(firstName.get(i));
    	   doc.setLast_name(lastName.get(i));
    	   doc.setSpeciality(speciality.get(i));
    	   //System.out.println(role.get(i));
    	   DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-YYYY");
           String yesterday=formatter.format(timeNow.minusDays(1)).toString();
           
    	   doc.setStartDate(yesterday);
    	   doc.setEndDate(yesterday);
    	   
    	   
    	   
    	   
    	   physicianAvailabilityRepository.save(doc);
    	   
    	   //System.out.println(x);
    	   
    		   
    	  
    		   }
    	   }
    	   
    	   
       }
		

	}


	@Override
	public List<PhysicianAvailabiityModel> findAllPhysicianOnDate(String date) throws ParseException {
		// TODO Auto-generated method stub
		List<PhysicianAvailabiityModel>allPhy=physicianAvailabilityRepository.findAll();
		List<PhysicianAvailabiityModel>physicianOnThatDate=new ArrayList<>();
		for(PhysicianAvailabiityModel physician:allPhy) {
			
			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
			Date currentDate=sdf.parse(date); 
			Date startdate = sdf.parse(physician.getStartDate());  
			Date enddate = sdf.parse(physician.getEndDate()); 
			int sD=currentDate.compareTo(startdate);
			int eD=currentDate.compareTo(enddate);
		
			if(sD==1 && eD==-1) {
				physicianOnThatDate.add(physician);
			}
				
			
		}
		
		return physicianOnThatDate;
	}

	@Override
	public Optional<PhysicianAvailabiityModel> findDoctorInfoByEmailId(String email) {
		
		return physicianAvailabilityRepository.findById(email);
	}

	
	//Sangeeta
		@Override
		public long countDoctors() {
			return physicianAvailabilityRepository.count();
			
		}

	
}