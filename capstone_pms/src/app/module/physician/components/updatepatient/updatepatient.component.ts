import { PhysicianService } from './../../physician.service';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NewobservationComponent } from '../newobservation/newobservation.component';
import { EditobservationComponent } from '../editobservation/editobservation.component';
import { DeleteobservationComponent } from '../deleteobservation/deleteobservation.component';
import { EnterprescriptionComponent } from '../enterprescription/enterprescription.component';
import { ViewprescriptionComponent } from '../viewprescription/viewprescription.component';

import * as XLSX from 'xlsx';

export interface PeriodicElement {
  id: number;
  testConducted: string;
  actualResult: string;
  status: string;
  remarks: string;
  action1: string;
  action2: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-updatepatient',
  templateUrl: './updatepatient.component.html',
  styleUrls: ['./updatepatient.component.scss'],
})
export class UpdatepatientComponent implements AfterViewInit, OnInit {
  ngOnInit(): void {
    this.getPatientbyId();
    this.getvisitdetailsbyid();
    this.getAppointmenthHistoryDetailsById();
    this.getAllTestByVisitId();
    this.service.refreshNeeded.subscribe(() => {
      this.getAllTestByVisitId();
    });
  }
  displayedColumns: string[] = [
    'testId',
    'testName',
    'result',
    'testNotes',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private matDialog: MatDialog,
    private service: PhysicianService
  ) {}

  //view previous history click

  viewprevioushistoryclick() {}

  dataSource: any;
  patientid: any = sessionStorage.getItem('patientId');
  patientbyIdData: any;

  // patientId: any;
  getPatientbyId() {
    console.log('this is patient id in getPatientbyId ', this.patientid);
    this.service.getPatientbyId(this.patientid).subscribe((response) => {
      this.patientbyIdData = response;
      console.log('this is patient data ', this.patientbyIdData);
    });
  }

  // get visit detilas by apppointment id
  show!: boolean;
  appointmentId: any = sessionStorage.getItem('appointment_Id');
  visistdetailsdata: any;
  getvisitdetailsbyid() {
    console.log(
      'this is patient id in getvisitdetailsbyid aaaaaaa',
      this.appointmentId
    );
    this.service
      .getvisitdetailsbyid(this.appointmentId)
      .subscribe((response) => {
        this.visistdetailsdata = response;
        console.log(
          'visit id in get visit details by id',
          this.visistdetailsdata.visitId
        );

        sessionStorage.setItem('newVisitId', this.visistdetailsdata.visitId);
        console.log(
          'visit detials data by appointment id ',
          this.visistdetailsdata
        );
        if (this.visistdetailsdata.appointmentId === null) {
          this.show = false;
        } else {
          this.show = true;
        }
      });
  }

  testdata: any;
  newVisitId: any = sessionStorage.getItem('newVisitId');
  getAllTestByVisitId() {
    this.service.getPrevTests(this.newVisitId).subscribe((response) => {
      this.testdata = response;
      console.log('all test data in ', this.testdata);
      this.dataSource = new MatTableDataSource(this.testdata);
      this.dataSource.paginator = this.paginator;
    });
  }

  // Update test data by test id
  updateTestByTestId(testId: any) {
    sessionStorage.setItem('testId', testId);
  }

  // delete test by test id
  //**need to chenge visitid to test id  */
  deleteTestbyIdClick(testid: any) {
    sessionStorage.setItem('testIdForDelete', testid);
  }

  ///  geting last consulted on and with
  show1!: boolean;
  oldvisitid: any;
  visisthistorydetailsdata: any;
  getAppointmenthHistoryDetailsById() {
    console.log(
      'this is patient id in getvisit history detailsby id for history',
      this.patientid
    );

    this.service
      .getAppointmentHistoryDetailsById(this.patientid)
      .subscribe((response) => {
        this.visisthistorydetailsdata = response;
        console.log(
          'Appointment History Details By Id IN Update component',
          this.visisthistorydetailsdata
        );
        if (this.visisthistorydetailsdata.visitid === null) {
          this.show = false;
        } else {
          this.show = true;
        }
      });
  }
  openDialogNewObservation() {
    this.matDialog.open(NewobservationComponent),
      {
        Width: '800px',
      };
  }

  openDialogEditObservation() {
    this.matDialog.open(EditobservationComponent),
      {
        Width: '800px',
      };
  }

  openDialogDeleteObservation() {
    this.matDialog.open(DeleteobservationComponent),
      {
        Width: '800px',
      };
  }

  openDialogEnterPrescription() {
    this.matDialog.open(EnterprescriptionComponent),
      {
        Width: '800px',
      };
  }
  openDialogViewPrescription() {
    this.matDialog.open(ViewprescriptionComponent),
      {
        Width: '800px',
      };
  }

  exportToExcel(): void {
    const data: any[] = [];
    const columns: string[] = [];

    // Extract data from mat-table
    this.dataSource.data.forEach((item: any) => {
      const rowData: any[] = [];
      Object.keys(item).forEach((key) => {
        rowData.push(item[key]);
        if (!columns.includes(key)) {
          columns.push(key);
        }
      });
      data.push(rowData);
    });

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([columns, ...data]);

    // Add worksheet to workbook and save file
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'table-data.xlsx');
  }
}
