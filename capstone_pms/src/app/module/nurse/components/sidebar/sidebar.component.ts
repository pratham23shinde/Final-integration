import { Component, OnInit } from '@angular/core';
import { NurseService } from '../../nurse.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  ngOnInit(): void {
    this.getNurseInfo();
    console.log(this.currentNurseEmail);
    console.log('nurse info ', this.nurseInfo);
    //throw new Error('Method not implemented.');
  }
  constructor(private service: NurseService) {}
  currentNurseEmail = sessionStorage.getItem('currentUserEmail');

  nurseInfo: any;
  getNurseInfo() {
    this.service
      .getNurseDetailsByEmail(String(this.currentNurseEmail))
      .subscribe((response: any) => {
        this.nurseInfo = response;
        console.log('nurse response', response);
      });
  }
}
