import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../delete/delete.component';
import { OutComponent } from '../out/out.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  constructor(public dialog : MatDialog,public authService:AuthService){}


  openLogout(){
    this.dialog.open(OutComponent);
  }

  openDelete(){
    this.dialog.open(DeleteComponent);
  }
}
