import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NurseService } from '../../nurse.service';

@Component({
  selector: 'app-previousappointment',
  templateUrl: './previousappointment.component.html',
  styleUrls: ['./previousappointment.component.scss'],
})
export class PreviousappointmentComponent implements OnInit {
  constructor(
    private appointmnetService: NurseService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getPeviousAppointment();
    this.getAppointmenthHistoryDetailsById();
  }

  patientId = sessionStorage.getItem('patientId');
  perviousAppointmentIdData: any;
  getPeviousAppointment() {
    this.appointmnetService
      .getAppointmentHistoryDetailsById(Number(this.patientId))
      .subscribe((response) => {
        this.perviousAppointmentIdData = response;
      });
  }

  perviousAppointmentVisitHistory: any;

  getAppointmenthHistoryDetailsById() {
    console.log(
      'this is patient id in getvisit history detailsby id for history',
      this.patientId
    );

    this.appointmnetService
      .getAppointmentHistoryDetailsById(this.patientId)
      .subscribe((response: any) => {
        this.perviousAppointmentVisitHistory = response;
        console.log(
          'Appointment History Details By Id IN Update component',
          this.perviousAppointmentVisitHistory.appointmentId
        );
        console.log('gayatri', response);
        sessionStorage.setItem(
          'previousAppointmentId',
          this.perviousAppointmentVisitHistory.appointmentId
        );
      });
  }

  ///for previous appoitment diagnosis
  diagnosis = sessionStorage.getItem('previousDiagnosis');
}
