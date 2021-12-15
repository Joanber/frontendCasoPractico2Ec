import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';

@Component({
  selector: 'app-convocatoria',
  templateUrl: './convocatoria.component.html',
  styleUrls: ['./convocatoria.component.css']
})
export class ConvocatoriaComponent implements OnInit {

  public paginaActual = 0;
  public totalPorPagina = 10;
  //VARIABLE DE CARRERAS
  public carreras: Carrera[] = [];
  //VARIABLE PARA BUSCAR
  public busqueda: string = "";
  constructor(private carreraService: CarreraService) {}

  ngOnInit() {
    this.getCarrerasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }

  private getCarrerasPage(page: string, size: string, busqueda: string) {
    this.carreraService.getCarrerasPage(page, size, busqueda).subscribe((p) => {
      this.carreras = p.content as Carrera[];
    });
  }
  }
