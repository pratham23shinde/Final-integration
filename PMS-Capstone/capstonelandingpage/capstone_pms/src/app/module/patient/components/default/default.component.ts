import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';
import { OutComponent } from '../out/out.component';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  constructor(public dialog : MatDialog){}


  openLogout(){
    this.dialog.open(OutComponent);
  }

  openDelete(){
    this.dialog.open(DeleteComponent);
  }
}
