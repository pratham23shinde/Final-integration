import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  adddoc: AddDoctor = new AddDoctor();

  constructor(
    public dialogRef: MatDialogRef<AdddoctorComponent>,
    private service: AdminService
  ) {}

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
    this.addPhysicianAuth();
    this.doctorAddMethod();
    this.dialogRef.close();
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
