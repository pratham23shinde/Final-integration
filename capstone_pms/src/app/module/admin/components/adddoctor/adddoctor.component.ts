import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export class AddDoctor {
  email: any;
  firstName: any;
  lastName: any;
  password: any;
  speciality: any;
  role: any;
}

@Component({
  selector: 'app-adddoctor',
  templateUrl: './adddoctor.component.html',
  styleUrls: ['./adddoctor.component.scss'],
})
export class AdddoctorComponent {

  myGroup: FormGroup;
  passwordFormControl: any;
  confirmPasswordFormControl: any;

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  adddoc: AddDoctor = new AddDoctor();
  myInputEmail: AbstractControl<any, any>;
  password1: AbstractControl<any, any>;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AdddoctorComponent>,
    private service: AdminService
  ) {
    //dialogRef.disableClose=true;
    this.myGroup = this.formBuilder.group(
      {
        password1: ['', [Validators.required,Validators.minLength(8),this.createPasswordStrengthValidator()]],
        confirmPassword: ['', [Validators.required]],
        myInputFirst: ['', [Validators.required]],
        myInputLast: ['', [Validators.required]],
        myInputSpeciality: ['', [Validators.required]],
        myInputEmail: [null, [Validators.required, Validators.email]],
       
      },

      { validator: this.passwordMatchValidator }
    );

    this.myInputEmail= this.myGroup.controls['myInputEmail'];
    this.password1=this.myGroup.controls['password1'];


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


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickSubmit() {


    this.adddoc.role = 'Doctor';
    console.log('doctor data', this.adddoc);
    if (this.myGroup.valid) {
      this.addPhysicianAuth();
    this.doctorAddMethod();
    this.dialogRef.close();
    }
    else{
      console.log("form invalid");
    }

    
    
  }

  addPhysicianAuth() {
    this.service.addPhysicianService(this.adddoc).subscribe(
      (response: any) => {
        this.service.addDoctorUser().subscribe();
      },
      (error: HttpErrorResponse) => {
        this.service.addDoctorUser().subscribe();
        alert('Succesfull');
      }
    );
  }

  public doctorAddMethod(): void {
    this.service.addDoctorUser().subscribe();
  }
}