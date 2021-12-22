import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  private status = new BehaviorSubject<object[]>([
    {
      style: { color: '#285D27', background: '#C8E1C2' },
      styleSelect: {
        'background-color': '#C8E1C2', 'font-size':'15px','border-radius': '8px', 'padding': '5px 7px',
      }
      , name: 'A tiempo'
    },
    {
      style: { color: '#8A5340', background: '#FEEDAF' },
      styleSelect: {
        'background-color': '#FEEDAF', 'font-size': '15px', 'border-radius': '8px', 'padding': '5px 7px',
      },
      name: 'Por cumplir el plazo'
    },
    {
      style: { color: '#C63737', background: '#FFCDD2' },
      styleSelect: {
        'background-color': '#FFCDD2', 'font-size': '15px', 'border-radius': '8px', 'padding': '5px 7px'
      },
      name: 'Fuera de tiempo'
    }
  ]);
  status$ = this.status.asObservable();
  constructor() {}
}
