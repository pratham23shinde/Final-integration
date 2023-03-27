import { PhysicianService } from './../../physician.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';

@Component({
  selector: 'app-acceptappointments',
  templateUrl: './acceptappointments.component.html',
  styleUrls: ['./acceptappointments.component.scss']
})
export class AcceptappointmentsComponent {
  constructor(
    private snakBar: MatSnackBar,
    private service: PhysicianService
  ) {}

  data: any;
  appointmentId: any = sessionStorage.getItem('appointmentid');
  Accept() {
    this.service
      .acceptappointment(this.appointmentId, 'accepted')
      .subscribe((response) => {
        this.data = response;
      });
  }

  openAcceptSnackbar(message: string, action: string) {
    let snakBarRef = this.snakBar.open(message, action, { duration: 3000 });
    snakBarRef.afterDismissed().subscribe();

    snakBarRef.onAction().subscribe();
  }

}
