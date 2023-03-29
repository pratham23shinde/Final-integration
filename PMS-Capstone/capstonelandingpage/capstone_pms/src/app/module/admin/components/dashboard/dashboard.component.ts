import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdddoctorComponent } from '../adddoctor/adddoctor.component';
import { AdminService } from '../../admin.service';
import { HttpErrorResponse } from '@angular/common/http';

const CARDS = [
  {
    name: 'Doctors',
    rlink: '/admin/doctor-availability',
  },
  {
    name: 'Patients',
    rlink: '/admin/patient-info',
  },
  {
    name: 'Nurses',
    rlink: '/admin/nurse-info',
  },
  {
    name: 'Total Appointments',
    rlink: 'icon',
  },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  cards = CARDS;

  constructor(public dialog: MatDialog, private service: AdminService) {}

  openDialogAddDoc() {
    this.dialog.open(AdddoctorComponent);
  }


  ngOnInit() {
    this.getAppointmentCount();
    this.getDoctorCount();

    this.getPatientCount();
    this.getNurseCount();
  }

  public aCount : any;
  public dCount : any;
  public pCount : any;
  public nCount : any;

  public getAppointmentCount(): void {
    this.service.getAppointmentCount().subscribe(
      (response: any) => {
        this.aCount = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getDoctorCount(): void {
    this.service.getDoctorCount().subscribe(
      (response: any) => {
        this.dCount = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getPatientCount(): void {
    this.service.getPatientCount().subscribe(
      (response: any) => {
        this.pCount = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getNurseCount(): void {
    this.service.getNurseCount().subscribe(
      (response: any) => {
        this.nCount = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}