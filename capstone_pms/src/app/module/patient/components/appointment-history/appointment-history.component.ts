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
    'date',
    'drFirstName',
    'physicianEmail',
    'reason',
    'acceptance',
  ];
  


  constructor(private patientService: PatientService) {}
  ngOnInit() {
    this.getAppointmentByPatient();
    // this.getAllAppointment();
    this.patientService.refreshNeeded.subscribe(() => {
      this.getAppointmentByPatient();
    });
  }
@ViewChild(MatPaginator) paginator!:MatPaginator;
  // ngAfterViewInit(){
  //   this.dataSource.paginator=this?.paginator;
  // }


  /////////////////////////////
  pId: any = sessionStorage.getItem('patientid');
  dataSource:any;
  getAppointmentPatient: any;
  getAppointmentByPatient() {
    this.patientService
      .getAppointmentByPatient(this.pId)
      .subscribe((response?) => {
        this.getAppointmentPatient = response;
        // console.log('Object gained', this.getAppointmentPatient);
        this.dataSource=new MatTableDataSource(this.getAppointmentPatient);
        this.dataSource.paginator=this.paginator;
      });
  }

  //searchbox
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }
}
