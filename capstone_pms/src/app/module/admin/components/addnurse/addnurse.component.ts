import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';

export class AddNurse {
  email: any;
  firstName: any;
  lastName: any;
  password: any;
  speciality: any;
  role: any;
}

@Component({
  selector: 'app-addnurse',
  templateUrl: './addnurse.component.html',
  styleUrls: ['./addnurse.component.scss'],
})
export class AddnurseComponent {
  myGroup: FormGroup;
  passwordFormControl: any;
  confirmPasswordFormControl: any;

  
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  addnurse: AddNurse = new AddNurse();
  myInputEmail: AbstractControl<any, any>;
  password1: AbstractControl<any, any>;
  constructor(
    public dialogRef: MatDialogRef<AddnurseComponent>,
    private formBuilder: FormBuilder,
    private service: AdminService
  ) {
    
    this.myGroup = this.formBuilder.group(
      {
        password1: ['', [Validators.required,Validators.minLength(8),this.createPasswordStrengthValidator()]],
        confirmPassword: ['', [Validators.required]],
        myInputFirst: ['', [Validators.required]],
        myInputLast: ['', [Validators.required]],
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
    this.addnurse.role = 'Nurse';
    this.addnurse.speciality = '';
    if (this.myGroup.valid) {
    this.addNurseAuth();
    this.nurseAddMethod();
    this.dialogRef.close();
    }
  }

  addNurseAuth() {
    this.service.addNurseService(this.addnurse).subscribe(
      (response: any) => {
        this.service.addNurseUser().subscribe();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  nurseAddMethod(): void {
    this.service.addNurseUser().subscribe();
  }
}