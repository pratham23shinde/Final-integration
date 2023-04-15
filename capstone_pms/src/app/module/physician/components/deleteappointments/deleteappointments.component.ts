import { MatSnackBar } from '@angular/material/snack-bar';
import { PhysicianService } from './../../physician.service';
import { Component, OnInit } from '@angular/core';

export class EmailData {
  toMail: any;
  subject: any;
  message: any;
}
@Component({
  selector: 'app-deleteappointments',
  templateUrl: './deleteappointments.component.html',
  styleUrls: ['./deleteappointments.component.scss'],
})
export class DeleteappointmentsComponent implements OnInit {
  constructor(private service: PhysicianService, private snakBar: MatSnackBar) {
    this.emaildata = new EmailData();
  }
  ngOnInit(): void {
    this.getPatientbyId();
    this.rejectAppointmentEmail();
    throw new Error('Method not implemented.');
  }

  acceptance: string = 'Rejected';
  deletedata: any;
  appointmentid: any = sessionStorage.getItem('appointmentid');
  delete() {
    this.service
      .rejectAppointment(this.appointmentid, this.acceptance)
      .subscribe((response) => {
        this.deletedata = response;
        this.rejectAppointmentEmail();
        console.log(
          'this is patient id whose appointment delete',
          this.appointmentid
        );
      });
  }

  openAcceptSnackbar(message: string, action: string) {
    let snakBarRef = this.snakBar.open(message, action, { duration: 3000 });
    snakBarRef.afterDismissed().subscribe();

    snakBarRef.onAction().subscribe();
  }

  openrejectSnackbar(message: string, action: string) {
    let snakBarRef = this.snakBar.open(message, action, { duration: 3000 });
    snakBarRef.afterDismissed().subscribe();

    snakBarRef.onAction().subscribe();
  }

  patientbyIdData: any;
  patientEmail: any;
  patientId: any = sessionStorage.getItem('patientIdForRejectEmail');
  physicianName: any = sessionStorage.getItem('physicianName');
  bookingDate: any = sessionStorage.getItem('bookingDateForReject');
  getPatientbyId() {
    console.log('patient id for reject appointment ', this.patientId);
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
  //Email service for rejection
  successMessage: any;
  rejectAppointmentEmail() {
    this.emaildata.toMail = this.patientEmail;
    this.emaildata.subject = 'Appoitnment Rejected';
    this.emaildata.message = `Hii ${this.patientName} ! Your appointment of date with dr.${this.physicianName} is Rejected`;

    console.log('email  data in reject ', this.emaildata);
    this.service.appointmentEmail(this.emaildata).subscribe((response) => {
      this.successMessage = response;
      console.log('mail send successfull ', this.successMessage);
    });
  }
}
