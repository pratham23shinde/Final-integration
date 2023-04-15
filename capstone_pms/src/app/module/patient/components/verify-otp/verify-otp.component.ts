import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from '../../patient.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  username!: string;
  password!: string;
  onsubmit() {
    console.log(this.username);
    console.log(this.password);
  }

  email!: string;
  otp!: string;
  newPassword!: string;
  retypePassword!: string;
  showOTP: boolean = false;
  showNewPassword: boolean = false;
  showIncorrectOTP: boolean = false;
  showPasswordMismatch: boolean = false;
  VerifyEmail: boolean = false;

  emailbutton: boolean = true;
  verifybutton: boolean = true;

  patiets: any[] = [];

  // email:any[]=[]

  emailExists: boolean | undefined;
  emailToCheck: any;
  patientemail: any;
  userEmail!: string;
  userOtp!: string;
  randomNum: any;
  constructor(public dialog : MatDialog,private patientService: PatientService,private router:Router) {}

  verifyOTP() {
    // Verify OTP
    // If OTP is correct, show new password input fields
    // If OTP is incorrect, show error message
    console.log(sessionStorage.getItem('ResetOtp') + 'huuytrftgyhtrrtyui');
    if (sessionStorage.getItem('ResetOtp') === this.userOtp) {
      this.showIncorrectOTP = false;
      console.log('sedrfghjtyhhhhh8uhuh88');

      this.showNewPassword = true;
      this.verifybutton = false;
    } else {
      this.showIncorrectOTP = true;
    }
  }
}
