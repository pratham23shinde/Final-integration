import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../../patient.service';

export class Login {
  patientId: number = 0;
  email: any;
  password: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login = new Login();
  msg = '';

  constructor(private patientService: PatientService, private router: Router) {}

  ngOnInit(): void {}

  loginUser() {
    this.patientService.loginUserFromRemote(this.login).subscribe(
      (data) => {
        if (data != null) {
          console.log(data.patientId);
          sessionStorage.setItem('title', data.title);
          sessionStorage.setItem('patientid', data.patientId);
          sessionStorage.setItem('firstName', data.firstName);
          sessionStorage.setItem('lastName', data.lastName);

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
