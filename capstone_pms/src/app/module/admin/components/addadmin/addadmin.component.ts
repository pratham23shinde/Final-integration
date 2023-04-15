import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AddNurse } from '../addnurse/addnurse.component';

export class AddAdmin {
  email: any;
  firstName: any;
  lastName: any;
  password:any
  speciality: any;
  role:any;
  
}


@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.scss']
})

export class AddadminComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  addadmin: AddAdmin= new AddAdmin();
  
  constructor(public dialogRef: MatDialogRef<AddadminComponent>,
    private service: AdminService,
    ) {}

  getErrorMessage() {
    // if (this.email.hasError('required')) {
    //   return 'This field is required';
    // }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  onClickSubmit() {
    this.addadmin.role='Admin'
    this.addadmin.speciality=''
    this.addAdminAuth();
    this.adminAddMethod();
    this.dialogRef.close();
    
  }

 addAdminAuth(){
    this.service.addAdminService(this.addadmin).subscribe(
      (response: any) => {
        this.service.addAdminUser().subscribe();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  adminAddMethod(): void {
    this.service.addAdminUser().subscribe();
    
  }
}