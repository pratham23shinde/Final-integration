import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../../patient.service';
import { HttpClient } from '@angular/common/http';
import { CalenderUser } from './book_appointment.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

class AppointmentUser {
  drFirstName: any;
  drLastName: any;
  reason: any;
  date: any;
  patient_id: any;
  physician_email: any;
  submissionDate: any;
  patientTitle:any;
  patientFirstName:any;
  patientLastName:any;
  doctorData: any;
}

interface Doctor {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
})
export class BookAppointmentComponent implements OnInit {
  myGroup: FormGroup;
  cUser = new AppointmentUser();
  num: any = sessionStorage.getItem('patientid');
  pTitle:any=sessionStorage.getItem('title');
  pFName:any=sessionStorage.getItem('firstName');
  pLName:any=sessionStorage.getItem('lastName')
  nameee: any;

  doctors: any[] = [];
  drWithSpeciality: any[] = [];
  drWithOnlyPerticularSpeciality: any[] = [];
  selectedItem: any;
 

  tittle = 'datePicker';
  calenderUser: CalenderUser = new CalenderUser();
  getDate: any;
  Date1: Date = new Date();
  constructor(
    private formBuilder: FormBuilder,

    private _snackBar: MatSnackBar,
    private patientService: PatientService,
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe,
    private matDialogRefrence: MatDialogRef<BookAppointmentComponent>
  ) {
    this.myGroup = this.formBuilder.group({
      dateInput: ['', [Validators.required]],
      specialityInput: ['', [Validators.required]],
      doctorInput: ['', [Validators.required]],
      reasonInput: ['', [Validators.required]],

    });


  }

  ngOnInit() {
    this.getDateTime();
  }
  /////////////////////////////////////////////////
  changeClient(value: any) {
    console.log(this.cUser.patient_id);

    //console.log(string(this.doctors[1].physician_email)==string(value));
    for (let i = 0; i < this.doctors.length; i++) {
      if (value == this.doctors[i].physicianEmail) {
        console.log(this.doctors[i]);
        this.calenderUser.physicianEmail = this.doctors[i].physicianEmail;
        this.calenderUser.drFirstName = this.doctors[i].first_name;
        this.calenderUser.drLastName = this.doctors[i].last_name;
        this.calenderUser.speciality = this.doctors[i].speciality;
        this.calenderUser.patientId = this.num;
        this.calenderUser.patientTitle = this.pTitle;
        this.calenderUser.patientFirstName = this.pFName;
        this.calenderUser.patientLastName = this.pLName;

      }
    }
  }
  /////////////////////////////////////
  minDate: any = '';
  getDateTime() {
    var date: any = new Date();
    var toDate: any = date.getDate();
    if (toDate < 10) {
      toDate = '0' + toDate;
    }
    var month: any = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    var year = date.getFullYear();
    this.minDate = year + '-' + month + '-' + toDate;
    console.log(this.minDate);
  }
  //////////////////////////////////////////////////////////////
  select = true;

  getAvaiDoctors(appointmentDate: any) {
    this.http
      .get(
        'http://localhost:9007/api/v1/physician-available/OnthatDate/' +
          appointmentDate
      )
      .subscribe((result: any) => {
        this.doctors = result;
        //this.drWithSpeciality = result;
        let mySet = new Set();
        this.drWithSpeciality = [];
        for (let i = 0; this.doctors.length; i++) {
          if (mySet.has(this.doctors[i]['speciality']) == false) {
            this.drWithSpeciality.push(this.doctors[i]);
            mySet.add(this.doctors[i]['speciality']);
          }
        }

        console.log(this.drWithSpeciality);

        if (this.doctors.length == 0) {
          this.select = false;
        } else if (this.doctors.length != 0) {
          this.select = true;
        }
        // else{
        //   this.select==false;
        // }
        this.saveUser;
        console.log(this.select);

        // for(let i=0;this.doctors.length;i++){
        //   console.log(i);
        // }
        //this.pe.physicianEmail=this.doctors
        //       for(var item in this.doctors){
        // console.log(item);
      });
  }

  /////////////////////////////////////////////////////////////////////////////////
  arr: string = JSON.parse(sessionStorage.getItem('doctorData') || '{}');

  saveUser() {
    this.patientService.addAppointment(this.calenderUser).subscribe(
      (data: any) => {
        data = this.cUser;
        console.log(this.cUser);

        console.log(data);
      },
      (error: any) => console.log(error)
    );
    this.matDialogRefrence.close();
  }

  //////////////////////////////////////////////////////////////////
  onSubmit() {
    this.calenderUser.submissionDate = this.datePipe.transform(
      this.Date1,
      'dd-MMM-yyyy'
    );
   

    if (this.myGroup.valid) {
      this.saveUser();
  }}
  /////////////////////////////////////////////////////////////
  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    console.log(`Date selected: ${event.value}`);
    // Add your function logic here
    this.calenderUser.date = this.datePipe.transform(
      this.calenderUser.date,
      'dd-MMM-yyyy'
    );

    console.log('specialityjnnncc', this.selectedItem);
    this.getAvaiDoctors(this.calenderUser.date);
  }
  //  goToUserList(){
  //   this.router.navigate(['/patient/register']);
  // }

  getAvaiDoctorsWithSpeciality(speciality: any) {}

  onChangeSelectSpeciality(event: any) {
    this.drWithOnlyPerticularSpeciality = [];
    for (let i = 0; this.doctors.length; i++) {
      if (this.doctors[i]['speciality'] == this.selectedItem) {
        this.drWithOnlyPerticularSpeciality.push(this.doctors[i]);
      }
    }
  }
  openSnackBar() {
    this._snackBar.open("Appointment Booked Succesfully","",{duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass:['snackbar']
    });
  }
}
