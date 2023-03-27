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

export interface NurseData {
  nurse_email: number;
  first_Name: string;
  last_Name: string;
}

@Component({
  selector: 'app-nurseinfo',
  templateUrl: './nurseinfo.component.html',
  styleUrls: ['./nurseinfo.component.scss'],
})
export class NurseinfoComponent {
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private nurseListService: AdminService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getNurses();
  }
  ngAfterViewInit() {}
  public nurses: NurseData[] = []; //datasource
  displayedColumns: string[] = ['nurse_email', 'first_name', 'last_name'];

  dataSource = new MatTableDataSource<NurseData>();
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

  public getNurses(): void {
    this.nurseListService.getNurses().subscribe(
      (response: NurseData[]) => {
        this.nurses = response;

        this.dataSource = new MatTableDataSource<NurseData>(this.nurses);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
