import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AdminService } from '../../admin.service';

export interface PatientData {
  patientId: number;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  contactNumber: string;
  address: string;
  gender: string;
}

@Component({
  selector: 'app-patientinfo',
  templateUrl: './patientinfo.component.html',
  styleUrls: ['./patientinfo.component.scss'],
})
export class PatientinfoComponent implements OnInit {
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private patientListService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getPatients();
  }

  public patients: PatientData[] = []; //datasource
  displayedColumns: string[] = [
    'patientId',
    'title',
    'firstName',
    'lastName',
    'email',
    'dob',
    'contactNumber',
    'address',
    'gender',
  ];

  dataSource = new MatTableDataSource<PatientData>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //pageSizes = [3, 5, 7];
  @ViewChild(MatSort) sort!: MatSort;

  //sorting
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

  public getPatients(): void {
    this.patientListService.getPatients().subscribe(
      (response: PatientData[]) => {
        this.patients = response;

        this.dataSource = new MatTableDataSource<PatientData>(this.patients);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
