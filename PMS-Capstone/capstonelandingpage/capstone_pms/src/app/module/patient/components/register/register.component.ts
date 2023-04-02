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
import { ValidationErrors, ValidatorFn} from '@angular/forms';


export class User {
  reset(arg0: {}) {
    throw new Error('Method not implemented.');
  }
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
  myGroup: FormGroup;

  // myInputTitle = new FormControl('', [Validators.required]);
  // myInputFirst = new FormControl('', [Validators.required]);
  // myInputLast = new FormControl('', [Validators.required]);
  // myInputEmail = new FormControl('', [Validators.required, Validators.email]);
  // myInputContact = new FormControl('', [Validators.required, this.phoneNumberValidator]);
  // myInputDob=new FormControl('', [Validators.required]);
  // myInputGender=new FormControl('', [Validators.required]);
  // myInputAddress=new FormControl('', [Validators.required]);

  passwordFormControl: any;
  confirmPasswordFormControl: any;
  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.myGroup = this.formBuilder.group(
      {
        password1: ['', [Validators.required,Validators.minLength(8),this.createPasswordStrengthValidator()]],
        confirmPassword: ['', [Validators.required]],
        myInputTitle: ['', [Validators.required]],
        myInputFirst: ['', [Validators.required]],
        myInputLast: ['', [Validators.required]],
        myInputEmail: ['', [Validators.required, Validators.email]],
        myInputContact: ['', [Validators.required, this.phoneNumberValidator]],
        myInputDob: ['', [Validators.required]],
        myInputGender: ['', [Validators.required]],
        myInputAddress: ['', [Validators.required]],
      },

      { validator: this.passwordMatchValidator }
    );
    this.passwordFormControl = this.myGroup.get('password1');
    this.confirmPasswordFormControl = this.myGroup.get('confirmPassword');
  }

    createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        // const hasSpecial=/[]

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

        return !passwordValid ? {passwordStrength:true}: null;
    }
}



  passwordMatchValidator(formGroup: FormGroup) {
    const password1 = formGroup.controls['password1'];
    const confirmPassword = formGroup.controls['confirmPassword'];
    if (password1.value !== confirmPassword.value) {
      confirmPassword.setErrors({ matchPassword: true });
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
        this.user.reset({});
        // this.router.navigate(['/patient/login']);
        this.user.dob = this.datePipe.transform(this.user.dob, 'dd-MM-YYYY');
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    if (this.myGroup.valid) {
      this.saveUser();
    }
    
  }
  
  phoneNumberValidator(control: FormControl): { [key: string]: any } | null {
    const phonePattern = /^\d{10}$/; // Define the phone number format (10 digits)
    const value = control.value;

    if (value && !phonePattern.test(value)) {
      return { phoneNumber: true }; // Return an error object if the input is invalid
    }

    return null; // Return null if the input is valid
  }
}

