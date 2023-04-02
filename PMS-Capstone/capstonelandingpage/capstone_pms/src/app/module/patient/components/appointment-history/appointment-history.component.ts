import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PatientService } from '../../patient.service';

export interface PeriodicElement {
  appointmentId: number;
  reason: string;
  date: string;
  drFirstName: string;
  drLastName: string;
  acceptance: string;
  physicianEmail: string;
  patientId: number;
  // submissionDate:string;

  // submissionDate: string;
}
const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.scss'],
})
export class AppointmentHistoryComponent implements OnInit {
  displayedColumns: string[] = [
    'appointmentId',
    'date',
    'drFirstName',
    // 'drLastName',
    'physicianEmail',
    'reason',
    'acceptance',
    // 'patientId',
    // 'submissionDate',
  ];
  


  constructor(private patientService: PatientService) {}
  ngOnInit() {
    this.patientService.refreshNeeded.subscribe(() => {
      this.getAppointmentByPatient();
    });

    this.getAppointmentByPatient();
    // this.getAllAppointment();
  }
@ViewChild(MatPaginator) paginator!:MatPaginator;
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator;
  }
  // getAppointment: any;
  // getAllAppointment() {
  //   this.patientService
  //     .getAllAppointmentByAcceptance('acceptance=Pending')
  //     .subscribe((respone) => {
  //       this.getAppointment = respone;
  //       console.log('Me basti ka hasti bro', this.getAppointment);
  //     });
  // }

  pId: any = sessionStorage.getItem('patientid');
  dataSource:any;
  getAppointmentPatient: any;
  // arr:PeriodicElement[]=[];
  getAppointmentByPatient() {
    this.patientService
      .getAppointmentByPatient(this.pId)
      .subscribe((response) => {
        this.getAppointmentPatient = response;
        // this.arr[0]=this.getAppointmentPatient.appointmentId;
        // this.arr[1]=this.getAppointmentPatient.reason;
        // this.arr[2]=this.getAppointmentPatient.date;
        // this.arr[3]=this.getAppointmentPatient.acceptance;
        // this.arr[4]=this.getAppointmentPatient.patientId;
        // this.arr[5]=this.getAppointmentPatient.physicianEmail;
        // this.arr[6]=this.getAppointmentPatient.submissionDate;

        console.log('Object gained', this.getAppointmentPatient);
        this.dataSource=new MatTableDataSource(this.getAppointmentPatient);
        this.dataSource.paginator=this.paginator;
      });
  }
}
