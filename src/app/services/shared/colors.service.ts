import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  private static pxFont = 12;
  private static pxbRadius = 8;
  private static pxpaddingh = 1;
  private static pxpaddingw = 7;

  private status = new BehaviorSubject<object[]>([
    {
      style: { color: '#285D27', background: '#C8E1C2' },
      styleSelect: {
        'background-color': '#C8E1C2', 'font-size': `${ ColorsService.pxFont
          }px`, 'border-radius': `${ ColorsService.pxbRadius
            }px`, 'padding': `${ ColorsService.pxpaddingh }px ${ ColorsService.pxpaddingw }px`,
      }
      , name: 'A tiempo'
    },
    {
      style: { color: '#8A5340', background: '#FEEDAF' },
      styleSelect: {
        'background-color': '#FEEDAF', 'font-size': `${ ColorsService.pxFont
          }px`, 'border-radius': `${ ColorsService.pxbRadius }px`, 'padding': `${ ColorsService.pxpaddingh }px ${ ColorsService.pxpaddingw }px`,
      },
      name: 'Por cumplir el plazo'
    },
    {
      style: { color: '#C63737', background: '#FFCDD2' },
      styleSelect: {
        'background-color': '#FFCDD2', 'font-size': `${ ColorsService.pxFont
          }px`, 'border-radius': `${ ColorsService.pxbRadius }px`, 'padding': `${ ColorsService.pxpaddingh }px ${ ColorsService.pxpaddingw }px`,
      },
      name: 'Fuera de tiempo'
    }
  ]);
  status$ = this.status.asObservable();
  constructor() {}
}
