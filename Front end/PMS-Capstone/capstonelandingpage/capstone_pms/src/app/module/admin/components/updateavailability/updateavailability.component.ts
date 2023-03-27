import { Component } from '@angular/core';
import {
  DoctorData,
  DoctoravailabilityComponent,
} from '../doctoravailability/doctoravailability.component';
import { AdminService } from '../../admin.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {FormControl,FormGroup} from '@angular/forms';

@Component({
  selector: 'app-updateavailability',
  templateUrl: './updateavailability.component.html',
  styleUrls: ['./updateavailability.component.scss'],
})
export class UpdateavailabilityComponent {
  public doctors: DoctorData = new DoctorData();
  public editDoctorAvailability: DoctorData = new DoctorData();
  public drName: any;
  public startDate: any;
  public endDate: any;
  public parent!: DoctoravailabilityComponent;
  public from:any;

  // minDate: Date;
  // maxDate: Date;

  constructor(
    private doctorService: AdminService,
    private doctorAvailability: AdminService,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<UpdateavailabilityComponent>
  ) {
    // const currentYear = new Date().getFullYear();
    // this.minDate = new Date(currentYear - 20, 0, 1);
    // this.maxDate = new Date(currentYear + 1, 11, 31);
  }
  todayDate: Date = new Date();

  
  
  
  nextTwoWeeks=new Date(Date.now() + 12096e5);
  
  dateFormCtrl = new FormControl(new Date());
  



  ngOnInit() {
    this.drName = this.doctorService.getThatVar();
  }

  printto() {
    console.log(this.doctorService.getThatVar());
  }

  

  selectedMatDate!: Date;

  public updatePhysicianAvailability(doctor: DoctorData): void {
    this.doctorAvailability.updatePhysicianAvailability(doctor).subscribe(
      (response: DoctorData) => {
        console.log(response);
        this.doctorService.availablePhysiciansUpdate(doctor);
        // this.dialogRef.afterClosed().subscribe(() => {
        //   this.parent.availablePhysicians();
        // });
        this.dialogRef.close();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //date format
  convertDate(a: any) {
    return this.datePipe.transform(a, 'dd-MM-yyyy');
  }

  onClickSubmit(arg0: any) {
    console.log(arg0.startDate);
    let savebtn = document.getElementById('Save');
    let cancelbtn = document.getElementById('Cancel');

    this.startDate = this.convertDate(arg0.startDate);
    this.endDate = this.convertDate(arg0.endDate);

    this.doctors.physicianEmail = this.drName;
    this.doctors.startDate = this.startDate;
    this.doctors.endDate = this.endDate;
    console.log(this.doctors.startDate);
    console.log(this.doctors.endDate);

    this.doctors.availability = true;
    this.updatePhysicianAvailability(this.doctors);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
}