import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NurseService } from '../../nurse.service';

export interface PeriodicElement {
  appointmentId: number;
  patientId: number;
  date: string;
  reason: string;
  info: boolean;
}
@Component({
  selector: 'app-doctorappointments',
  templateUrl: './doctorappointments.component.html',
  styleUrls: ['./doctorappointments.component.scss']
})
export class DoctorappointmentsComponent implements OnInit {
  currentDatee=new Date();
  displayedColumns: string[] = [
    'appointmentId',
    'patientId',
    'date',
    'reason',
    'info',
  ];
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    
      
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  constructor(private service: NurseService, public datepipe: DatePipe, private _liveAnnouncer: LiveAnnouncer,) {}
  ngOnInit(): void {
    this.getTodaysAppointment();

    //this.getallPatient();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSizes = [3, 5, 7];
  @ViewChild(MatSort) sort!: MatSort;

  todayDate: Date = new Date();
  currentDate: DatePipe = new DatePipe('en-us');
  dataSource: any;
  todaysAppointment: any;
  transformdate: any;
  email: any = sessionStorage.getItem('requiredDoctorEmail');
  status = 'acceptance=Accepted';

  formattedDate: any;
  // currentDate1: DatePipe = new DatePipe('en-us');
  onDateSelected(selectedDate: string) {
    this.formattedDate = this.datepipe.transform(selectedDate, 'dd-MM-yyyy');
    console.log(this.formattedDate);
    this.service
      .getTodaysAppointmentByDoctorEmail(this.email, this.formattedDate, this.status)
      .subscribe((response) => {
        this.todaysAppointment = response;

        console.log(this.transformdate);

        this.dataSource = new MatTableDataSource(this.todaysAppointment);
        this.dataSource.paginator = this.paginator;
      });
  }

  currentPhysicianEmail=sessionStorage.getItem("requiredDoctorEmail");
  getTodaysAppointment() {
    var date = new Date();
    this.transformdate = this.currentDate.transform(date, 'dd-MM-YYYY');
    console.log(this.transformdate);
    this.service
      .getTodaysAppointmentByDoctorEmail(String(this.currentPhysicianEmail), this.transformdate, this.status)
      .subscribe((response) => {
        this.todaysAppointment = response;
        console.log(this.todaysAppointment);

        this.dataSource = new MatTableDataSource(this.todaysAppointment);
        this.dataSource.paginator = this.paginator;
      });
  }

  // getpatientidbyclick(patientid: any, appointmentId: any) {
  //   sessionStorage.setItem('patientId', patientid);
  //   sessionStorage.setItem('appointment_Id', appointmentId);
  // }

  PatientId: any = sessionStorage.getItem('patientId');

  // ngAfterViewInit() {
  //   // this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  // }

  // patientdata: any;
  // getallPatient() {
  //   this.service.getallPatient().subscribe((response) => {
  //     this.patientdata = response;
  //     console.log(this.patientdata);
  //   });
  // }
 

}