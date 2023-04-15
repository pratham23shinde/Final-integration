import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-submitdialog',
  templateUrl: './submitdialog.component.html',
  styleUrls: ['./submitdialog.component.scss'],
})
export class SubmitdialogComponent {
  //to popup snackar after save button is clicked

  constructor(private _snackBar: MatSnackBar) {}
  durationInSeconds = 5;
  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}
