import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-historial-procesos-ppp',
  templateUrl: './historial-procesos-ppp.component.html',
  styleUrls: ['./historial-procesos-ppp.component.css']
})
export class HistorialProcesosPppComponent implements OnInit, AfterViewInit {
  tipo: '';
  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  tipos= [
    {tipo:'Carreras'},
    {tipo:'Proyectos'},
  ]
  constructor() {}

  ngOnInit() {
  }

  ngAfterViewInit() {

  }
}
