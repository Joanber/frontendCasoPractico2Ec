import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  private pxFont = 16;
  private pxbRadius = 18;
  private pxpaddingl = 5;
  private pxpaddingr = 5;

  private status = new BehaviorSubject<object[]>([
    {
      style: { color: '#122911', background: '#C8E1C2' },
      styleSelect: {
        'background-color': '#C8E1C2', 'font-size': `${ this.pxFont
          }px`, 'border-radius': `${ this.pxbRadius
            }px`, 'padding': `0px ${ this.pxpaddingl }px 0px ${ this.pxpaddingr }px`, color: '#122911'
      }
      , name: 'A tiempo'
    },
    {
      style: { color: '#573428', background: '#FEEDAF' },
      styleSelect: {
        'background-color': '#FEEDAF', 'font-size': `${ this.pxFont
          }px`, 'border-radius': `${ this.pxbRadius }px`, 'padding': `0px ${ this.pxpaddingl }px 0px ${ this.pxpaddingr }px`, color: '#573428'
      },
      name: 'Por cumplir el plazo'
    },
    {
      style: { color: '#7F2020', background: '#FFCDD2' },
      styleSelect: {
        'background-color': '#FFCDD2', 'font-size': `${ this.pxFont
          }px`, 'border-radius': `${ this.pxbRadius }px`, 'padding': `0px ${ this.pxpaddingl }px 0px ${ this.pxpaddingr }px`, color: '#942929'
      },
      name: 'Fuera de tiempo'
    }
  ]);
  status$ = this.status.asObservable();
  constructor() {}
}
