import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  NgForm,
} from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../../patient.service';
import { ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OpendialogregisterComponent } from '../opendialogregister/opendialogregister.component';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
export class User {
  reset(arg0: {}) {
    // throw new Error('Method not implemented.');
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
  hide1 = true;

  myGroup: FormGroup;
  currentDate = new Date();
  selectedDate = new FormControl();
  x:boolean=true;
  passwordFormControl: any;
  confirmPasswordFormControl: any;
  myInputEmail: AbstractControl<any, any>;
  myInputContact: AbstractControl;
  password1: AbstractControl<any, any>;

  constructor(
    private _snackBar:MatSnackBar,
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private datePipe: DatePipe,
    public dialog: MatDialog,private http:HttpClient
  ) {
    this.myGroup = this.formBuilder.group(
      {
        password1: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.createPasswordStrengthValidator(),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        myInputTitle: ['', [Validators.required]],
        myInputFirst: ['', [Validators.required]],
        myInputLast: ['', [Validators.required]],
        myInputEmail: ['', [Validators.required, Validators.email]],
        myInputContact: ['', [Validators.required, this.phoneNumberValidator]],
        myInputDob: ['', [Validators.required]],
        myInputGender: ['', [Validators.required]],
        myInputAddress: ['', [Validators.required]],
        // myInputBlood: ['', [Validators.required]],
      },

      { validator: this.passwordMatchValidator }
    );
this.myInputEmail=this.myGroup.controls['myInputEmail'];
this.myInputContact=this.myGroup.controls['myInputContact'];
this.password1=this.myGroup.controls['password1'];


    this.passwordFormControl = this.myGroup.get('password1');
    this.confirmPasswordFormControl = this.myGroup.get('confirmPassword');
  }

  search() {
    // Here you can put the code to retrieve data based on the searchTerm input value.
    this.checkExist( this.user.email);
    console.log(this.x);
  }
  
  checkExist(email: any) {
    return this.http
      .get(
        "http://localhost:9001/authentication-service/patient/checkemail?email="+email)
      
      .subscribe((result: any) => {
        this.x=result;
        console.log(result);
        if(result==false){
          console.log("exists")
          this.openSnackBar();
        }
      })
    }

  emailPresent(formGroup: FormGroup) {
        // this.checkExist( this.user.email);
    //const password1 = formGroup.controls['myInputContact'];
    const myInputEmail = formGroup.controls['myInputEmail'];
    if (this.x==false) {
      
      this.openSnackBar();
      myInputEmail.setErrors({ emailExistOrNot: true });
    } else {
      myInputEmail.setErrors(null);
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
  createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);

      const hasLowerCase = /[a-z]+/.test(value);

      const hasNumeric = /[0-9]+/.test(value);

      // const hasSpecial=/[]

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }

 
  ngOnInit() {
  
  }
  hide = true;
  user: User = new User();

  saveUser() {
    this.user.dob = this.datePipe.transform(this.user.dob, 'dd-MMM-yyyy');
    this.patientService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        this.user.reset({});
      },
      (error) => console.log(error)
    );
  }

  
  onSubmit() {
    if (this.myGroup.valid) {
      
      this.saveUser();
      // this.resetForm();
    }



    //  this.user.dob = this.datePipe.transform(this.user.dob, 'dd-MM-YYYY');
  }

  phoneNumberValidator(control: FormControl): { [key: string]: any } | null {
    const phonePattern = /^\d{10}$/; // Define the phone number format (10 digits)
    const value = control.value;

    if (value && !phonePattern.test(value)) {
      return { phoneNumber: true }; // Return an error object if the input is invalid
    }

    return null; // Return null if the input is valid
  }

  //Open dialog for registration
  openDialogRegister(): void {

    const dialogRef = this.dialog.open(OpendialogregisterComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  resetForm():void{
    this.myGroup.reset();
  }

  openSnackBar(){
this._snackBar.open('Email already exist','close',{
  horizontalPosition: 'center',
  verticalPosition: 'top',
  duration:3000,
  panelClass: ['red_snackbar']
})
  }

}