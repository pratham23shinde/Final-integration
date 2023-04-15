import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from '../../patient.service';
import { BookAppointmentComponent } from '../book-appointment/book-appointment.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public dialog : MatDialog,private patientService:PatientService){}
  ngOnInit(): void {
    this.getPatientbyId();
}
openDialog(){
  this.dialog.open(BookAppointmentComponent);
}

num: any = sessionStorage.getItem('patientid');


patientbyIdData: any;
getPatientbyId() {
  console.log(this.num);
  this.patientService.getPatientbyId(this.num).subscribe((response) => {
    this.patientbyIdData = response;
    console.log(this.patientbyIdData);
  });
}
}
