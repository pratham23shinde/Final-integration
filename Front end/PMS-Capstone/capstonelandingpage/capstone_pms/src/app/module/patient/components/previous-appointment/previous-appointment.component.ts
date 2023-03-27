import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../patient.service';

export interface AppointmentList {
  appointmentId: number;
  patientId: number;
  date: string;
  reason: string;
  info: boolean;
  acceptance: string;
  submissionDate: string;
  physicianEmail: string;
}
const appointment_data: AppointmentList[] = [];

@Component({
  selector: 'app-previous-appointment',
  templateUrl: './previous-appointment.component.html',
  styleUrls: ['./previous-appointment.component.scss'],
})
export class PreviousAppointmentComponent implements OnInit {
  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getPeviousAppointment();
    this.getPeviousAppointmentVisitHistory();
  }

  num: any = sessionStorage.getItem('patientid');
  perviousAppointmentIdData: any;
  getPeviousAppointment() {
    this.patientService
      .getPeviousAppointment(this.num)
      .subscribe((response) => {
        this.perviousAppointmentIdData = response;
        console.log(response);
        console.log(this.perviousAppointmentIdData.appointmentId);
      });
  }

  perviousAppointmentVisitHistory: any;
  getPeviousAppointmentVisitHistory() {
    console.log(this.perviousAppointmentIdData.appointmentId);
    this.patientService
      .getPeviousAppointmentVisitHistory(
        this.perviousAppointmentIdData.appointmentId
      )
      .subscribe((response) => {
        this.perviousAppointmentVisitHistory = response;
        console.log(response);
      });
  }
}
