import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-opendialogregister',
  templateUrl: './opendialogregister.component.html',
  styleUrls: ['./opendialogregister.component.scss']
})
export class OpendialogregisterComponent {
  constructor(public dialogRef: MatDialogRef<OpendialogregisterComponent>) {}
}
