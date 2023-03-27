// import { DatePipe } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { PatientService } from '../../patient.service';

// interface Doctor {
//   value: string;
//   viewValue: string;
// }

// class AppointmentUser {
//   drFirstName: any;
//   drLastName: any;
//   reason: any;
//   date: any;
//   patient_id: any;
//   physician_email: any;
//   submissionDate: any;
//   doctorData:any;
// }

// export class CalenderUser{
//   date: any;
//     reason: any;
//      physicianEmail: any;
//     submissionDate: any;
//     drFirstName:any;
//     drLastName:any;
//      patientId:any;

// }
// @Component({
//   selector: 'app-book-appointment',
//   templateUrl: './book-appointment.component.html',
//   styleUrls: ['./book-appointment.component.scss']
// })
// export class BookAppointmentComponent  implements OnInit {

//   appointmentUser=new AppointmentUser;
//   cuser

//   tittle = 'datePicker';
//   calenderUser:CalenderUser=new CalenderUser();
//   getDate: any;
//   Date1:Date =new Date();
//   constructor(private patientService: PatientService,
//     private router:Router,
//     private datePipe: DatePipe){}

//   ngOnInit(){
//     this.getDateTime();

//   }

//   minDate:any ="";
//   getDateTime(){
//     var date:any = new Date();
//     var toDate:any =date.getDate();
//     if(toDate < 10){
//       toDate = '0' + toDate;
//     }
//     var month:any = date.getMonth() +1;
//     if(month <10){
//       month = '0' + month;
//     }
//     var year = date.getFullYear();
//     this.minDate = year+ "-" + month +"-" + toDate;
//     console.log(this.minDate);

//   }

//   selectedMatDate!:Date;

//    doctors: Doctor[] = [
//     {value: 'doctor-1', viewValue: 'Dr. Ashish Sabharwal'},
//     {value: 'doctor-2', viewValue: 'Dr. Surbhi Anand'},
//     {value: 'doctor-3', viewValue: 'Dr. Sanjay Sachdeva'},
//     {value: 'doctor-4', viewValue: 'Dr. Aditya Gupta'},
//   ];
// getDoctor:any;
//   // getAvailDoctor(){
//   //   this.calenderService.getAvailDoctor().subscribe((respone: any)=>{
//   //     this.getDoctor=respone;
//   //     console.log(this.getDoctor);

//   //   })
//   // }

//   saveUser(){
//     this.patientService.addAppointment(this.calenderUser).subscribe((data: any)=>{
//       console.log(data);
//             // this.goToUserList();
//     },
//       (    error: any) => console.log(error));

//  }
// //  goToUserList(){
// //   this.router.navigate(['/patient/register']);
// // }
// onSubmit(){
//   this.calenderUser.submissionDate=this.datePipe.transform(this.Date1,"dd-MM-yyyy");
//   this.calenderUser.date=this.datePipe.transform(this.calenderUser.date,"dd-MM-yyyy");
//   console.log(this.calenderUser);
//   this.saveUser();
// }
// }

////////////////////////////
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../../patient.service';
import { HttpClient } from '@angular/common/http';
import { CalenderUser } from './book_appointment.model';

class AppointmentUser {
  drFirstName: any;
  drLastName: any;
  reason: any;
  date: any;
  patient_id: any;
  physician_email: any;
  submissionDate: any;
  doctorData: any;
}

// export interface PeriodicElement {
//   physicianEmail: string;
//   first_name: string;
//   last_name: string;
// }
interface Doctor {
  name: string;
  sound: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
})
export class BookAppointmentComponent implements OnInit {
  appointmentUser = new AppointmentUser();
  cUser = new AppointmentUser();

  num: any = sessionStorage.getItem('patientid');
  // drEmail: any = sessionStorage.getItem('physicianEmail');
  // drFirstName: any = sessionStorage.getItem('first_name');
  // drLastName: any = sessionStorage.getItem('last_name');
  nameee: any;

  doctors: any[] = [];

  doctorControl = new FormControl<Doctor | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  // animals: Doctor[] = [
  //   { name: 'Rushikesh', sound: 'Woof!' },
  //   { name: 'Cat', sound: 'Meow!' },
  //   { name: 'Cow', sound: 'Moo!' },
  //   { name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' },
  // ];

  // displayedColumns: string[] = ['physicianEmail', 'first_name', 'last_name'];

  tittle = 'datePicker';
  calenderUser: CalenderUser = new CalenderUser();
  getDate: any;
  Date1: Date = new Date();
  constructor(
    private patientService: PatientService,
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.getDateTime();
    this.getAvaiDoctors();

    // for(let i=0;i<this.arr.length;i++){
    //   // console.log("ghghg",this.arr[i]);

    // }
  }

  changeClient(value: any) {
    //console.log(value);
    //console.log(value==this.doctors[1].physicianEmail);
    console.log(this.cUser.patient_id);

    //console.log(string(this.doctors[1].physician_email)==string(value));
    for (let i = 0; i < this.doctors.length; i++) {
      if (value == this.doctors[i].physicianEmail) {
        console.log(this.doctors[i]);
        this.calenderUser.physicianEmail = this.doctors[i].physicianEmail;
        this.calenderUser.drFirstName = this.doctors[i].first_name;
        this.calenderUser.drLastName = this.doctors[i].last_name;
        this.calenderUser.patientId = this.num;
      }
    }
  }

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

  // selectedMatDate!: Date;

  //  doctors: Doctor[] = [
  //   {value: 'doctor-1', viewValue: 'Dr. Ashish Sabharwal'},
  //   {value: 'doctor-2', viewValue: 'Dr. Surbhi Anand'},
  //   {value: 'doctor-3', viewValue: 'Dr. Sanjay Sachdeva'},
  //   {value: 'doctor-4', viewValue: 'Dr. Aditya Gupta'},
  // ];
  // getDoctor: any;
  // getAvailDoctor(){
  //   this.calenderService.getAvailDoctor().subscribe((respone: any)=>{
  //     this.getDoctor=respone;
  //     console.log(this.getDoctor);

  //   })
  // }
  // periodic: PeriodicElement = {} as PeriodicElement;
  getAvaiDoctors() {
    this.http
      .get('http://localhost:9007/api/v1/physician-avail?availability=true')
      .subscribe((result: any) => {
        // console.log(result);
        // sessionStorage.setItem('doctorData',JSON.stringify(result));
        //result.ph
        this.doctors = result;
        console.log(this.doctors);
        // for(let i=0;this.doctors.length;i++){
        //   console.log(i);
        // }
        //this.pe.physicianEmail=this.doctors
        //       for(var item in this.doctors){
        // console.log(item);
      });
  }

  // doctors[i].physician_email==thatval
  // sessionSaveDoctor() data{
  //   // (
  //   //   data1: {
  //   //     physicianEmail: string;
  //   //     first_name: string;
  //   //     last_name: string;
  //   //   } | null
  //   // ) => {
  //   //   if (data1 != null) {

  //       sessionStorage.setItem('physicianEmail',physicianEmail);
  //       sessionStorage.setItem('first_name', first_name);
  //       sessionStorage.setItem('last_name',last_name);
  //     }
  //   };

  // sessionDoctor() {
  //   // this.getAvaiDoctors()(
  //     (data1: { patientId: any; physicianEmail: string; first_name: string; last_name: string; } | null) => {
  //       if (data1 != null) {
  //         console.log(data1.patientId);
  //         sessionStorage.setItem('physician_email', data1.physicianEmail);
  //         sessionStorage.setItem('drFirstName', data1.first_name);
  //         sessionStorage.setItem('drLastName', data1.last_name);

  //         console.log('response recieved');
  //         // this.router.navigate(['/patient/default']);
  //         console.log(data1);

  //       }
  //     }}
  // getaDoctor:any;
  // getDoctorAvail(){
  //   this.patientService.getAvaiDoctors(false).subscribe((response)=>{
  //     this.getaDoctor=response;
  //     console.log(this.getaDoctor)
  //   })}
  arr: string = JSON.parse(sessionStorage.getItem('doctorData') || '{}');

  saveUser() {
    this.patientService.addAppointment(this.calenderUser).subscribe(
      (data: any) => {
        this.cUser.patient_id = this.num;
        this.cUser.doctorData = this.arr;
        // this.cUser.physician_email = this.drEmail;
        // this.cUser.drFirstName = this.drFirstName;
        // this.cUser.drLastName = this.drLastName;

        data = this.cUser;
        console.log(this.cUser);

        console.log(data);
        // this.goToUserList();
      },
      (error: any) => console.log(error)
    );
  }
  //  goToUserList(){
  //   this.router.navigate(['/patient/register']);
  // }
  onSubmit() {
    this.calenderUser.submissionDate = this.datePipe.transform(
      this.Date1,
      'dd-MM-yyyy'
    );
    this.calenderUser.date = this.datePipe.transform(
      this.calenderUser.date,
      'dd-MM-yyyy'
    );
    console.log(this.calenderUser);
    this.saveUser();
    // this.cUser;
  }
}
