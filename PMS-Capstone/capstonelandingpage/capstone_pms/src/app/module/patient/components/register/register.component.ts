import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../../patient.service';

export class User {
  title: any;
  firstName: any;
  lastName: any;
  email: any;
  contactNumber: any;
  dob: any;
  gender: any;
  password: any;
  address: any;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  // myForm: FormGroup;

  // nameFormControl = new FormControl('', [Validators.required]);
  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);
  // contactFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern('[0-9]{10}'),
  // ]);
  // // dobFormControl=new FormControl('',[Validators.required,Validators.])
  // passwordFormControl: any;
  // confirmPasswordFormControl: any;
  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private datePipe: DatePipe
  )
  {}
  //   this.myForm = this.formBuilder.group(
  //     {
  //       password: ['', [Validators.required]],
  //       confirmPassword: ['', [Validators.required]],
  //     },
  //     { validator: this.passwordMatchValidator }
  //   );
  //   this.passwordFormControl = this.myForm.get('password');
  //   this.confirmPasswordFormControl = this.myForm.get('confirmPassword');
  // }

  // passwordMatchValidator(formGroup: FormGroup) {
  //   const password = formGroup.controls['password'];
  //   const confirmPassword = formGroup.controls['confirmPassword'];
  //   if (password.value !== confirmPassword.value) {
  //     confirmPassword.setErrors({ matchPassword: true });
  //   } else {
  //     confirmPassword.setErrors(null);
  //   }
  // }

  ngOnInit(): void {}
  hide = true;
  user: User = new User();

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
    this.user.dob = this.datePipe.transform(this.user.dob, 'dd-MM-YYYY');
    console.log(this.user);
    this.saveUser();
  }
}
