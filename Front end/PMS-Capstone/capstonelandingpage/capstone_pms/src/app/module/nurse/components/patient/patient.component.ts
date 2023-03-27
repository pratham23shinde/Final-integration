import { NurseService } from './../../nurse.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
export interface VisitDetails{
  
   height:number;
   weight:any;
   bpDiastolic:any;
   bpSystolic:any;
   bloodGroup:any;
   bodyTemperature:any;
   patientId :any;
   appointmentId :any;
   nurseEmail :any;
   physicianEmail :any;
  allergyName:any;
   repirationRate:any;
   keyNotes:any;
   daignosis:any;

}

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
 
visitDetails:any;
//getting appoitmentId from sessionstrorage
appoitmentId =sessionStorage.getItem('appointmentId')
 constructor(private service:NurseService){}
  ngOnInit(): void {
    this.getVisitId() ; 
  }

private _visitDetails :VisitDetails[]=[];

  getVisitId():void{
  console.log( "appoitment "+this.appoitmentId);
  this.service.getVisitId(Number(this.appoitmentId)).subscribe(
   (response)=>{
    this.visitDetails=response;
      console.log("privious visit id",this.visitDetails.visitId);
     sessionStorage.setItem("previousVisitId",this.visitDetails.visitId) ;
     sessionStorage.setItem("previousDiagnosis",this.visitDetails.diagnosis);
    },
    (error:HttpErrorResponse)=>{
      alert(error.message);
    }
  );
 }
}