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
  name: any;
  role: any;
  constructor(
    private doctorService: AdminService,
    private service: AdminService,
    public dialogRef: MatDialogRef<DoctoravailabilityComponent>
  ) {}

  ngOnInit() {
    this.name = this.doctorService.getThatVar();
    this.role = this.doctorService.getRole();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick() {
    if (this.role == 'doctoravailability') {
      this.deletePhysicianAvailability(this.name);
      this.dialogRef.close();
    }
    if (this.role == 'doctor') {
      this.deleteDoctor(this.name);
      this.deletePhysicianAvailability(this.name);
      this.dialogRef.close();
    }

    if (this.role == 'nurse') {
      this.deleteNurse(this.name);
      this.deleteNurseFromDatabase(this.name);
      this.dialogRef.close();
    }

    if (this.role == 'admin') {
      this.deleteAdmin(this.name);
      this.deleteAdminFromDatabase(this.name);
      this.dialogRef.close();
    }
  }

  public deletePhysicianAvailability(doctor: string): void {
    this.service.deletePhysicianAvailability(doctor).subscribe(
      (response: any) => {
        console.log(response);
        // this.doctorService.availablePhysiciansdelete(doctor);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  deleteDoctor(doctor: string) {
    this.service.deleteDoctor(doctor).subscribe((response: any) => {
      console.log('doc deleted');
    });
  }

  deleteNurse(nurse: string) {
    this.service.deleteNurse(nurse).subscribe((response: any) => {
      console.log('nurse deleted');
    });
  }

  deleteAdmin(admin: string) {
    this.service.deleteAdmin(admin).subscribe((response: any) => {
      console.log('admin deleted');
    });
  }

  deleteNurseFromDatabase(nurse: string) {
    this.service.deleteNurseDatabase(nurse).subscribe((response: any) => {
      console.log('nurse deleted');
    });
  }

  deleteAdminFromDatabase(admin: string) {
    this.service.deleteAdminFromDatabase(admin).subscribe((response: any) => {
      console.log('admin deleted');
    });
  }
}
