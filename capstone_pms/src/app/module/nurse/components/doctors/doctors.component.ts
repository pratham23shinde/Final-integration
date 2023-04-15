import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NurseService } from '../../nurse.service';
import { Router } from '@angular/router';


export class PhysicianDetailsList{
  
  
  physicianEmail :any;
  first_name:any;
  last_name:any;
  speciality:any;

}
@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {
  constructor(
    private service: NurseService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.getAllPysicians()
    
  }

   details: PhysicianDetailsList[]=[];
  
  arr :[] =[]
  public getAllPysicians(): void {
    this.service.getAllDoctors().subscribe((response: PhysicianDetailsList[]) => {
        this.details = response;
        console.log('All details', this.details);
  
       
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      );
  }

  actionMethod(requiredPhysicianEmail:any){
   console.log(requiredPhysicianEmail);
   
    sessionStorage.setItem("requiredDoctorEmail",requiredPhysicianEmail);
  }

}