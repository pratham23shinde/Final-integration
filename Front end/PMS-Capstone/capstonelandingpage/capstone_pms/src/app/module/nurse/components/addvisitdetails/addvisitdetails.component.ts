import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NurseService } from '../../nurse.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { VisitDetails } from './visistDetails.model';


export interface Allergy{
  allergyId:any;
  allergyName:any;
  allergyNotes:any;

}
@Component({
  selector: 'app-addvisitdetails',
  templateUrl: './addvisitdetails.component.html',
  styleUrls: ['./addvisitdetails.component.scss']
})
export class AddvisitdetailsComponent implements OnInit{
// allergyName
// cuurentAlergyName:any;


  bloodGroups: any[] = [
    {value: 'O+', viewValue: 'O+'},
    {value: 'O-', viewValue: 'O-'},
    {value: 'A+', viewValue: 'A+'},
    {value: 'A-', viewValue: 'A-'},
    {value: 'B+', viewValue: 'B+'},
    {value: 'B-', viewValue: 'B-'},
    {value: 'AB+', viewValue: 'AB+'},
    {value: 'AB-', viewValue: 'AB-'},
  ];
  public visitDetails: VisitDetails=new VisitDetails() ;
  user=new VisitDetails();
  constructor(private _visitDetailsService:NurseService, private router :Router,private _snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.getAllergies();
      this.saveDetails();
      this.getBloodGroup();
      console.log("appointmentid stored in session storage",sessionStorage.getItem('physicianEmail'));
      console.log("patientid stored in session storage",sessionStorage.getItem('patientId'));
      console.log(this.visitDetails);
   
      // console.log(this.getAllergies());
  }
    
//to popup snackar after save button is clicked
  durationInSeconds = 5
  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

//to disable  save button is  after one click clicked
  clicked = false;

  actionMethod() {
    console.log("actionMethod was called!");
  }
  //getting id and email from sessionStorage
  currentAppoitmentId =sessionStorage.getItem('appointmentId');
  currentPatientId  =sessionStorage.getItem('patientId');
  currentPhysicianEmail =sessionStorage.getItem('physicianEmail');
  
  //to add visit details in the visitdetails  of healthInfo microservice
  saveDetails():void{
    this.visitDetails.physicianEmail = this.currentPhysicianEmail;
      this.visitDetails.appointmentId = this.currentAppoitmentId;
      this.visitDetails.patientId =this.currentPatientId;
   
    this._visitDetailsService.addVisitDetails(this.visitDetails).subscribe((data:any)=>{
      //  console.log(data);
      // console.log("gayu radti ahe",this.user);
      console.log("appointmentid stored in session storage",sessionStorage.getItem('physicainEmail'));
      // console.log(this.visitDetails);
      
      
    },
    error => console.log(error));
    
  }
  onSubmit(arg:any){
    console.log(this.visitDetails);
    console.log(arg.height);
    this.saveDetails();
  }
hide=true;

  
//to get blood group if present in visitdatabase of healrhInfo microservice
curPateinetId=sessionStorage.getItem("patientId")
 visitDetailsForBloodGroup:any;
 public isDisabled!: boolean;
  public getBloodGroup():void{
    console.log(this.curPateinetId);
    this._visitDetailsService.getBloodGroup(Number(this.curPateinetId)).subscribe(

      
      response=>{
        this.visitDetailsForBloodGroup=response;
         if(this.visitDetailsForBloodGroup.bloodGroup.length>0){
          this.isDisabled=true;
          this.visitDetails.bloodGroup=this.visitDetailsForBloodGroup.bloodGroup;
            
        }else{
          this.isDisabled=false;
        }
        console.log("disable", this.isDisabled)
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
    console.log("bloodgroup"+this.visitDetailsForBloodGroup.bloodGroup);
  }

   //get allergy list from alergy microservice
  public allergy: Allergy[]=[];
   public getAllergies():void{
     this._visitDetailsService.getAllAllergy().subscribe(
       (response:Allergy[])=>{

         this.allergy=response;
        console.log('allergies',this.allergy);
       },
       (error:HttpErrorResponse)=>{
         alert(error.message);
       }
     );
     
     
     
   }
  
 
}