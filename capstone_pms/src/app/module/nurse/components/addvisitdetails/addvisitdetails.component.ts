import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NurseService } from '../../nurse.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { VisitDetails } from './visistDetails.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SubmitdialogComponent } from '../submitdialog/submitdialog.component';
import { MatDialog } from '@angular/material/dialog';

export interface Allergy {
  allergyId: any;
  allergyName: any;
  allergyNotes: any;
}
@Component({
  selector: 'app-addvisitdetails',
  templateUrl: './addvisitdetails.component.html',
  styleUrls: ['./addvisitdetails.component.scss'],
})
export class AddvisitdetailsComponent implements OnInit {
  // allergyName
  // cuurentAlergyName:any;
  //reactive
  myGroup: FormGroup;

  bloodGroups: any[] = [
    { value: 'O+', viewValue: 'O+' },
    { value: 'O-', viewValue: 'O-' },
    { value: 'A+', viewValue: 'A+' },
    { value: 'A-', viewValue: 'A-' },
    { value: 'B+', viewValue: 'B+' },
    { value: 'B-', viewValue: 'B-' },
    { value: 'AB+', viewValue: 'AB+' },
    { value: 'AB-', viewValue: 'AB-' },
  ];
  public visitDetails: VisitDetails = new VisitDetails();
  user = new VisitDetails();
  constructor(
    private formBuilder: FormBuilder,

    private _visitDetailsService: NurseService,
    private matDialog: MatDialog
  ) {
    this.myGroup = this.formBuilder.group({
      myInputheight: ['', [Validators.required]],
      myInputweight: ['', [Validators.required]],
      myInputLastrespiration: ['', [Validators.required]],
      myInputtemperature: ['', [Validators.required]],
      myInputsystolic: ['', [Validators.required]],
      myInputdiastolic: ['', [Validators.required]],
      myInputallergies: ['', [Validators.required]],
      myInputbloodGroup: ['', [Validators.required]],
      myInputKeynotes: ['', [Validators.required, Validators.maxLength(60)]],
    });
  }

  ngOnInit(): void {
    this.getAllergies();
    console.log(
      'appointmentid stored in session storage',
      sessionStorage.getItem('physicianEmail')
    );
    console.log(
      'patientid stored in session storage',
      sessionStorage.getItem('patientId')
    );
    console.log(this.visitDetails);
    this.getBloodGroup();
    // console.log(this.getAllergies());
  }

  openDialogBox() {
    this.matDialog.open(SubmitdialogComponent),
      {
        Width: '800px',
      };
  }

  //to disable  save button is  after one click clicked
  clicked = false;

  actionMethod() {
    console.log('actionMethod was called!');
  }
  //getting id and email from sessionStorage
  currentAppoitmentId = sessionStorage.getItem('appointmentId');
  currentPatientId = sessionStorage.getItem('patientId');
  currentPhysicianEmail = sessionStorage.getItem('physicianEmail');
  currentNurseEmail = sessionStorage.getItem('currentUserEmail');
  //diagnosis= sessionStorage.getItem('previousDiagnosis');
  //to add visit details in the visitdetails  of healthInfo microservice
  saveDetails(): void {
    this.visitDetails.physicianEmail = this.currentPhysicianEmail;
    this.visitDetails.appointmentId = this.currentAppoitmentId;
    this.visitDetails.patientId = this.currentPatientId;
    this.visitDetails.nurseEmail = this.currentNurseEmail;
    this._visitDetailsService.addVisitDetails(this.visitDetails).subscribe(
      (data: any) => {
        //console.log(this.curPateinetId + " added visit details"+this.visitDetails);
        // console.log("gayu radti ahe",this.user);
        console.log(
          'appointmentid stored in session storage',
          sessionStorage.getItem('physicainEmail')
        );
        // console.log(this.visitDetails);
      },
      (error) => console.log(error)
    );
  }
  onSubmit(arg: any) {
    console.log('VISIST DETAILS AFTER SUBMIT', this.visitDetails);
    console.log(arg.height);
    this.clicked = true;

    if (this.myGroup.valid) {
      this.saveDetails();
    }
  }
  hide = true;

  //to get blood group if present in visitdatabase of healrhInfo microservice
  curPateinetId = sessionStorage.getItem('patientId');
  visitDetailsForBloodGroup: any;
  public isDisabled!: boolean;
  public getBloodGroup(): void {
    console.log('add visit ' + this.curPateinetId);
    this._visitDetailsService
      .getBloodGroup(Number(this.curPateinetId))
      .subscribe(
        (response) => {
          this.visitDetailsForBloodGroup = response;
          if (this.visitDetailsForBloodGroup.bloodGroup.length > 0) {
            this.isDisabled = true;
            this.visitDetails.bloodGroup =
              this.visitDetailsForBloodGroup.bloodGroup;
          } else {
            this.isDisabled = false;
          }
          console.log('disable', this.isDisabled);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    console.log('bloodgroup' + this.visitDetailsForBloodGroup.bloodGroup);
  }

  //get allergy list from alergy microservice
  public allergy: Allergy[] = [];
  public getAllergies(): void {
    this._visitDetailsService.getAllAllergy().subscribe(
      (response: Allergy[]) => {
        this.allergy = response;
        console.log('allergies', this.allergy);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  //validation for input

  numValidator(event: any) {
    if (event.target.value.length === 0 && event.key == '0') {
      event.preventDefault();
      alert('Enter null value');
    }
    if (event.target.value < 0) {
      event.target.value = event.target.value * -1;
    }
    event = event ? event : window.event;
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  floatValidator(event: any) {
    if (event.target.value.length === 0 && event.key == '0') {
      event.preventDefault();
      alert('Enter null value');
    }
    if (event.target.value < 0) {
      event.target.value = event.target.value * -1;
    }
    event = event ? event : window.event;
    var charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 46 || charCode > 57)) {
      return false;
    }
    return true;
  }
  ////currentvisitdetails
  curentVisitDetails: any;
}
