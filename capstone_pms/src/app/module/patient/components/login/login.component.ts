import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../../patient.service';
import { AuthService } from '../../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export class Login {
  patientId: number = 0;
  email: any;
  password: any;
  value: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login = new Login();
  msg = '';
loginForm:any;
  constructor(private patientService: PatientService, private router: Router,private authService :AuthService) {}

  ngOnInit(): void {
     this.loginForm = new FormGroup({
    emailInput: new FormControl('', [Validators.required, Validators.email]),
    passwordInput: new FormControl('', [Validators.required]),
  });}

  loginUser() {
    this.patientService.loginUserFromRemote(this.login).subscribe(
      (data) => {
        if (data != null) {
          sessionStorage.clear();
          console.log("fghjlkjjjjjjjjjjjjjjjjjjjj")
          console.log(data);
          console.log(data.patientId);
          this.authService.login(this.loginForm.value.emailInput);

          sessionStorage.setItem('title', data.title);
          sessionStorage.setItem('patientid', data.patientId);
          sessionStorage.setItem('firstName', data.firstName);
          sessionStorage.setItem('contactNumber', data.contactNumber);
          sessionStorage.setItem('dob', data.dob);
          sessionStorage.setItem('gender', data.gender);
          sessionStorage.setItem('address', data.address);

          sessionStorage.setItem('lastName', data.lastName);
          sessionStorage.setItem("PATIENT_EMAIL",data.email);
          sessionStorage.setItem('Patient_Data', JSON.stringify(data));

          console.log('response recieved');
          this.router.navigate(['/patient/default/dashboard']);
        }
      },
      (error) => {
        console.log('exception occured');
        this.msg = 'Please enter valid email & password';
      }
    );
  }

  hide = true;
}
