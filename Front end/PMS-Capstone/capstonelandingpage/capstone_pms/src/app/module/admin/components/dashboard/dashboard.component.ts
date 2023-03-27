import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdddoctorComponent } from '../adddoctor/adddoctor.component';

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

  constructor(public dialog: MatDialog) {}

  openDialogAddDoc() {
    this.dialog.open(AdddoctorComponent);
  }
}
