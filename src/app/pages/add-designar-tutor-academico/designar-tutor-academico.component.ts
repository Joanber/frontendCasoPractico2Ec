import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera.model';
import { Docente } from 'src/app/models/docente.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { DocenteService } from 'src/app/services/services.models/docente.service';

@Component({
  selector: 'app-designar-tutor-academico',
  templateUrl: './designar-tutor-academico.component.html',
  styleUrls: ['./designar-tutor-academico.component.css']
})
export class DesignarTutorAcademicoComponent implements OnInit {

  public paginaActual = 0;
  public totalPorPagina = 10;
  //VARIABLE DE CARRERAS
  public carreras: Carrera[] = [];
  //VARIABLE PARA BUSCAR
  public busqueda: string = "";
   //VARIABLE DE DOCENTES
  public docentes: Docente[] = [];
  constructor(private docenteService: DocenteService,
    private carreraService: CarreraService) {}

  ngOnInit() {
    this.getCarrerasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
    this.getDocentes();
  }

  private getCarrerasPage(page: string, size: string, busqueda: string) {
    this.carreraService.getCarrerasPage(page, size, busqueda).subscribe((p) => {
      this.carreras = p.content as Carrera[];
    });
  }

  private getDocentes() {
    this.docenteService.getDocentes().subscribe((docentes) => {
      this.docentes = docentes;
    });
  }
  }
