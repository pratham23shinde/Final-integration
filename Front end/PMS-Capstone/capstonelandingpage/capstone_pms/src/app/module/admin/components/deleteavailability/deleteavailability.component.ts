import { Component } from '@angular/core';
import { AdminService } from '../../admin.service';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { DoctoravailabilityComponent } from '../doctoravailability/doctoravailability.component';

@Component({
  selector: 'app-deleteavailability',
  templateUrl: './deleteavailability.component.html',
  styleUrls: ['./deleteavailability.component.scss'],
})
export class DeleteavailabilityComponent {
  drName: any;

  constructor(
    private doctorService: AdminService,
    private doctorAvailability: AdminService,
    public dialogRef: MatDialogRef<DoctoravailabilityComponent>
  ) {}

  ngOnInit() {
    this.drName = this.doctorService.getThatVar();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick() {
    this.deletePhysician(this.drName);
    this.dialogRef.close();
  }

  public deletePhysician(doctor: string): void {
    this.doctorAvailability.deletePhysicianAvailability(doctor).subscribe(
      (response: any) => {
        console.log(response);
        this.doctorService.availablePhysiciansdelete(doctor);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
