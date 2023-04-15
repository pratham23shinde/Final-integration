import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { UpdateavailabilityComponent } from '../updateavailability/updateavailability.component';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteavailabilityComponent } from '../deleteavailability/deleteavailability.component';
import { MatSort, Sort } from '@angular/material/sort';

export class DoctorData {
  physicianEmail: any;
  first_name: any;
  last_name: any;
  speciality: any;
  startDate: any;
  endDate: any;
  availability: any;
}
const doctor_data: DoctorData[] = [];

@Component({
  selector: 'app-doctoravailability',
  templateUrl: './doctoravailability.component.html',
  styleUrls: ['./doctoravailability.component.scss'],
})
export class DoctoravailabilityComponent implements OnInit {
  public doctors: DoctorData[] = [];
  public updateDialogRef!: MatDialogRef<UpdateavailabilityComponent>;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private doctorService: AdminService
  ) {}

  ngOnInit(): void {
    this.availablePhysicians();
    this.doctorService.refreshNeeded.subscribe(() => {
      this.availablePhysicians();
    });
  }

  displayedColumns: string[] = [
    'physicianEmail',
    'first_name',
    'last_name',
    'speciality',
    'startDate',
    'endDate',
    'availability',
    'update',
    'delete',
  ];
  dataSource = new MatTableDataSource<DoctorData>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //pageSizes = [3, 5, 7];
  @ViewChild(MatSort) sort!: MatSort;

  openDialogUpdate(pemail: string) {
    this.dialog.open(UpdateavailabilityComponent);
    this.doctorService.setThatVar(pemail);
  }

  openDialogDelete(pemail: string) {
    this.dialog.open(DeleteavailabilityComponent);
    this.doctorService.setThatVar(pemail);
  }

  public availablePhysicians(): void {
    this.doctorService.availablePhysicians().subscribe(
      (response: DoctorData[]) => {
        this.doctors = response;

        this.dataSource = new MatTableDataSource<DoctorData>(this.doctors);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  //sorting table
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  //searching
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
