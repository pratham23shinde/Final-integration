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

  // passwordForm = new FormGroup({
    // passwordInput= new FormControl('', [Validators.required]),
    // confirmPassword= new FormControl('', [Validators.required, this.matchPasswords.bind(this)]),
  
  
  
  // matchPasswords(control: FormControl) {
  //   // const password1 = this.get('password')?.value;
  //   if (password1 && control.value !== password1) {
  //     return { passwordMismatch: true };
  //   } else {
  //     return null;
  //   }
  // }
  

  myGroup: FormGroup;


  myInputTitle = new FormControl('', [Validators.required]);
  myInputFirst = new FormControl('', [Validators.required]);
  myInputLast = new FormControl('', [Validators.required]);
  myInputEmail = new FormControl('', [Validators.required, Validators.email]);
  myInputContact = new FormControl('', [Validators.required, this.phoneNumberValidator]);
  myInputDob=new FormControl('', [Validators.required]);
  myInputGender=new FormControl('', [Validators.required]);
  myInputAddress=new FormControl('', [Validators.required]);



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



  passwordFormControl: any;
  confirmPasswordFormControl: any;
  constructor(
    private formBuilder:FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private datePipe: DatePipe
  )
  {this.myGroup = this.formBuilder.group({
    password1: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  },
  
  { validator: this.passwordMatchValidator });
  this.passwordFormControl = this.myGroup.get('password1');
  this.confirmPasswordFormControl = this.myGroup.get('confirmPassword');}
  
  passwordMatchValidator(formGroup: FormGroup) {
    const password1 = formGroup.controls['password1'];
    const confirmPassword = formGroup.controls['confirmPassword'];
    if (password1.value !== confirmPassword.value) {
      confirmPassword.setErrors({ matchPassword: true});
    } else {
      confirmPassword.setErrors(null);
    }

  }
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


  // passwordMatchValidator(FormGroup: FormGroup) {
  //   const password = FormGroup.controls['password'];
  //   const confirmPassword = formGroup.controls['confirmPassword'];
  //   if (password.value !== confirmPassword.value) {
  //     confirmPassword.setErrors({ matchPassword: true });
  //   } else {
  //     confirmPassword.setErrors(null);
  //   }
    
  // myForm = this.formBuilder.group(
  //   {
  //     password: ['', [Validators.required]],
  //     confirmPassword: ['', [Validators.required]],
  //   },
  //   { validator: this.passwordMatchValidator }
  // );
  // this.passwordFormControl = this.myForm.get('password');
  // this.confirmPasswordFormControl = this.myForm.get('confirmPassword');



  phoneNumberValidator(control: FormControl): { [key: string]: any } | null {
    const phonePattern = /^\d{10}$/; // Define the phone number format (10 digits)
    const value = control.value;
  
    if (value && !phonePattern.test(value)) {
      return { 'phoneNumber': true }; // Return an error object if the input is invalid
    }
  
    return null; // Return null if the input is valid
  }
}
// function passwordMatchValidator(formGroup: any, FormGroup: typeof FormGroup) {
//   throw new Error('Function not implemented.');

