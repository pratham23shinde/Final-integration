import { PhysicianService } from './../../physician.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

export class EmailData {
  toMail: any;
  subject: any;
  message: any;
}

@Component({
  selector: 'app-acceptappointments',
  templateUrl: './acceptappointments.component.html',
  styleUrls: ['./acceptappointments.component.scss'],
})
export class AcceptappointmentsComponent implements OnInit {
  constructor(private snakBar: MatSnackBar, private service: PhysicianService) {
    this.emaildata = new EmailData();
  }

  ngOnInit(): void {
    this.getPatientbyId()
    this.acceptedAppointmentEmail();
    throw new Error('Method not implemented.');
  }

  data: any;
  appointmentId: any = sessionStorage.getItem('appointmentid');
  Accept() {
    this.service
      .acceptappointment(this.appointmentId, 'Accepted')
      .subscribe((response) => {
        this.data = response;
        this.acceptedAppointmentEmail();
      });
  }

  openAcceptSnackbar(message: string, action: string) {
    let snakBarRef = this.snakBar.open(message, action, { duration: 3000 });
    snakBarRef.afterDismissed().subscribe();

    snakBarRef.onAction().subscribe();
  }

  patientbyIdData: any;
  patientEmail: any;
  patientId: any = sessionStorage.getItem('patientIdForEmail');
  physicianName: any = sessionStorage.getItem('physicianName');
  bookingDate: any = sessionStorage.getItem('bookingDate');

  getPatientbyId() {
    console.log('patient id for accepted appointment ', this.patientId);
    this.service.getPatientbyId(this.patientId).subscribe((response) => {
      this.patientbyIdData = response;
      this.patientEmail = this.patientbyIdData.email;
      sessionStorage.setItem('patientName', this.patientbyIdData.firstName);
      console.log(
        'patient id for email',
        this.patientbyIdData.firstName,
        this.patientId,
        this.physicianName,
        this.patientEmail,
        this.bookingDate
      );
    });
  }

  emaildata: any;

  patientName: any = sessionStorage.getItem('patientName');
  //Email service
  successMessage: any;
  acceptedAppointmentEmail() {
    this.emaildata.toMail = this.patientEmail;
    this.emaildata.subject = 'Appoitnment Accepted';
    this.emaildata.message =
      'Hii' +
      this.patientName +
      ' ! \n Your appointment of date with dr. ' +
      this.physicianName +
      ' is accpted. Please come on time. Thank You !';

    console.log('email data', this.emaildata);
    // this.service.welcome().subscribe((data) => {
    //   console.log(data);
    // });
    this.service.appointmentEmail(this.emaildata).subscribe((response) => {
      this.successMessage = response;
      console.log('mail send successfull ', this.successMessage);
    });
  }
}
