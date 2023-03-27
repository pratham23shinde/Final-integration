import { Component } from '@angular/core';
import {
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AdminService } from '../../admin.service';

export interface AdminData {
  admin_email: string;
  first_Name: string;
  last_Name: string;
}

@Component({
  selector: 'app-admininfo',
  templateUrl: './admininfo.component.html',
  styleUrls: ['./admininfo.component.scss'],
})
export class AdmininfoComponent implements OnInit {
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private patientListService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAdmins();
  }

  public admins: AdminData[] = []; //datasource
  displayedColumns: string[] = ['admin_email', 'first_name', 'last_name'];
  dataSource = new MatTableDataSource<AdminData>();
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

  public getAdmins(): void {
    this.patientListService.getAdmins().subscribe(
      (response: AdminData[]) => {
        this.admins = response;

        this.dataSource = new MatTableDataSource<AdminData>(this.admins);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
