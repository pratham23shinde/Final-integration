import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  addnurse: AddNurse = new AddNurse();
  constructor(
    public dialogRef: MatDialogRef<AddnurseComponent>,
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
    this.addnurse.role = 'Nurse';
    this.addnurse.speciality = '';
    this.addNurseAuth();
    this.nurseAddMethod();
    this.dialogRef.close();
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
