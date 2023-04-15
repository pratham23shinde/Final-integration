import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PatientService } from '../../patient.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from './update-profile.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  // myGroup: FormGroup;
  currentDate = new Date();
  selectedDate = new FormControl();

  patient: Patient = new Patient();
  formattedDate: any;
  // myInputContact: AbstractControl<any, any>;

  constructor(private _snackBar:MatSnackBar,
    private patientService: PatientService,
    private router: Router,
    private formBuilder: FormBuilder,private datePipe: DatePipe
  ) {}
//     this.myGroup = this.formBuilder.group(
//       {
    
//         myInputTitle: ['', [Validators.required]],
//         myInputFirst: ['', [Validators.required]],
//         myInputLast: ['', [Validators.required]],
//         myInputContact: ['', [Validators.required, this.phoneNumberValidator]],
//         myInputDob: ['', [Validators.required]],
//         myInputGender: ['', [Validators.required]],
//         myInputAddress: ['', [Validators.required]],
//         // myInputBlood: ['', [Validators

//       },
// );this.myInputContact=this.myGroup.controls['myInputContact'];


  
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }
  
//   pTitle: any = sessionStorage.getItem('title');
//   pFname: any = sessionStorage.getItem('firstName');
//   pLname: any = sessionStorage.getItem('lastName');
//   pDob: any = sessionStorage.getItem('dob');
//   pGender: any = sessionStorage.getItem('gender');
//   pAddress: any = sessionStorage.getItem('address');
//   pContactNumber: any = sessionStorage.getItem('contactNumber');

// editProfile=new FormControl({
//   titleInput:new  FormControl(''),
//   FrstNameInput:new  FormControl(''),
// LastNameInput:new  FormControl(''),




  ngOnInit(): void {
    this.patient.patientId = parseInt(sessionStorage.getItem('patientid')!, 10);
    // this.editProfile=new FormControl({
    //   titleInput:new  FormControl('pTitle'),
    //   FrstNameInput:new  FormControl('pFname'),
    // LastNameInput:new  FormControl('pLname'),
    
    
    
    throw new Error('Method not implemented.');
  }
  phoneNumberValidator(control: FormControl): { [key: string]: any } | null {
    const phonePattern = /^\d{10}$/; // Define the phone number format (10 digits)
    const value = control.value;

    if (value && !phonePattern.test(value)) {
      return { phoneNumber: true }; // Return an error object if the input is invalid
    }

    return null; // Return null if the input is valid
  }
  onSubmit(value: any) {
    this.patient.title = value.title;
    this.patient.firstName = value.firstName;
    this.patient.lastName = value.lastName;
    this.patient.contactNumber = value.contactNumber;
    this.patient.dob = value.dob;
    this.patient.gender = value.gender;

    this.patient.address = value.address;
    // if (this.myGroup.valid) {
    //   this.updateUser();
    // }
    console.log(this.patient);
    this.updateUser();
  }

  updateUser() {
    this.patientService
      .updatePatient(this.patient.patientId, this.patient)
      .subscribe((data) => {
        console.log(data);
        // this.patient.dob = this.datePipe.transform(
        //   this.patient.dob,
        //   'dd-MM-yyyy'
        // );
        // this.dialogRef.close();
        this.router.navigate(['/profile']);
        this._snackBar.open("Updated Successfully","",{duration: 2000});
      });
  }
 
  // resetForm():void{
  //   this.myGroup.reset();
  // }
}
