import { MatSnackBar } from '@angular/material/snack-bar';
import { PhysicianService } from './../../physician.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-deleteappointments',
  templateUrl: './deleteappointments.component.html',
  styleUrls: ['./deleteappointments.component.scss']
})
export class DeleteappointmentsComponent {

  constructor(
    private service: PhysicianService,
    private snakBar: MatSnackBar
  ) {}
  ngOnInit(): void {
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

}
