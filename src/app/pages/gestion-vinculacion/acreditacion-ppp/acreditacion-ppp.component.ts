import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-acreditacion-ppp',
  templateUrl: './acreditacion-ppp.component.html',
  styleUrls: ['./acreditacion-ppp.component.css']
})
export class AcreditacionPppComponent implements OnInit {
  durationInSeconds = 0.8000;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {
  }

  openSnackBar() {
    this._snackBar.open('LORSSSS', null, {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: this.durationInSeconds * 1000,
      panelClass: ['toast-snackbar'],
    });
  }
}
