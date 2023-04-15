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
import { DoctorData } from '../doctoravailability/doctoravailability.component';

@Component({
  selector: 'app-doctorinfo',
  templateUrl: './doctorinfo.component.html',
  styleUrls: ['./doctorinfo.component.scss']
})
export class DoctorinfoComponent {

  public doctors: DoctorData[] = [];
  public updateDialogRef!: MatDialogRef<UpdateavailabilityComponent>;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private doctorService: AdminService
  ) {}

  ngOnInit(): void {
    this.doctorService.refreshNeeded.subscribe(() => {
      this.availablePhysicians();
    });

    this.availablePhysicians();
  }

  displayedColumns: string[] = [
    'physicianEmail',
    'first_name',
    'last_name',
    'speciality',
    'delete',
  ];
  dataSource = new MatTableDataSource<DoctorData>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;


  openDialogDelete(demail: string) {
    this.dialog.open(DeleteavailabilityComponent);
    this.doctorService.setThatVar(demail);
    this.doctorService.setRole("doctor");

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