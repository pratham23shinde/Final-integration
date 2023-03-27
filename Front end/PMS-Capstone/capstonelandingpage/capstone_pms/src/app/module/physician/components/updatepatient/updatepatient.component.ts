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
    this.service.refreshNeeded.subscribe(() => {
      this.getAllTestByVisitId();
    });

    // this.getallTest();
    // this.getallPatient();
    this.getPatientbyId();
    // this.delettestbyid();
    this.getvisitdetailsbyid();
    this.getAppointmenthHistoryDetailsById();
    this.getAllTestByVisitId();
  }
  displayedColumns: string[] = [
    'testId',
    'testName',
    'result',
    'testNotes',
    // 'remarks',
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

  // getallTest() {
  //   this.service.getallTest().subscribe((response) => {
  //     this.testdata = response;

  //     this.visitid = this.testdata[0].visitId;
  //     this.service.setvisitid(this.visitid);

  //     console.log(this.visitid);
  //   });
  // }

  deleteTestbyIdClick(teid: any) {
    sessionStorage.setItem('visitid', teid);
  }

  // deletestbyiddata: any;
  // patientdata: any;
  // getallPatient() {
  //   this.service.getallPatient().subscribe((response) => {
  //     this.patientdata = response;
  //     console.log(this.patientdata);
  //   });
  // }

  patientid: any = sessionStorage.getItem('patientId');
  patientbyIdData: any;
  // patientId: any;
  getPatientbyId() {
    console.log('this is patient id in getPatientbyId ', this.patientid);
    this.service.getPatientbyId(this.patientid).subscribe((response) => {
      this.patientbyIdData = response;
      console.log(this.patientbyIdData);
    });
  }

  // get visit detilas by apppointment id
  appointmentId: any = sessionStorage.getItem('appointment_Id');
  visistdetailsdata: any;
  getvisitdetailsbyid() {
    console.log(
      'this is patient id in getvisitdetailsbyid',
      this.appointmentId
    );
    this.service.getvisitdetailsbyid(this.patientid).subscribe((response) => {
      this.visistdetailsdata = response;
      console.log(
        'visit id in get visit details by id',
        this.visistdetailsdata.visitId
      );
      sessionStorage.setItem('visitId', this.visistdetailsdata.visitId);
      console.log(
        'visit detials data by appointment id ',
        this.visistdetailsdata
      );
    });
  }

  testdata: any;
  visitid: any = sessionStorage.getItem('visitId');
  getAllTestByVisitId() {
    this.service.getPrevTests(this.visitid).subscribe((response) => {
      this.testdata = response;
      console.log('all test data in ', this.testdata);
      this.dataSource = new MatTableDataSource(this.testdata);
      this.dataSource.paginator = this.paginator;
    });
  }

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
}
