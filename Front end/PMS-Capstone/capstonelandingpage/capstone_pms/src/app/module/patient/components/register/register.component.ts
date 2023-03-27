import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../../patient.service';

export class User{
  title:any;
  firstName:any;
  lastName:any;
  email:any;
  contactNumber:any;
  dob:any;
  gender:any;
  password:any;
  address:any;
  }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  ngOnInit(): void { }
  hide = true;
  user: User = new User();
  constructor(
    private patientService: PatientService,
    private router: Router,
    private datePipe: DatePipe,
  ) {}


  saveUser() {
    this.patientService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/patient/login']);
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    this.user.dob = this.datePipe.transform(this.user.dob, 'yyyy-mm-dd');
    console.log(this.user);
    this.saveUser();
  }

}
