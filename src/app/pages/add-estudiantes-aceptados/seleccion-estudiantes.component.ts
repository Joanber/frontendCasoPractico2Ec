import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera.model';
import { Docente } from 'src/app/models/docente.model';
import { Empresa } from 'src/app/models/empresa.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { DocenteService } from 'src/app/services/services.models/docente.service';
import { EmpresaService } from 'src/app/services/services.models/empresa.service';

@Component({
  selector: 'app-seleccion-estudiantes',
  templateUrl: './seleccion-estudiantes.component.html',
  styleUrls: ['./seleccion-estudiantes.component.css']
})
export class SeleccionEstudiantesComponent implements OnInit {

  //VARIABLE DE CARRERAS
  public carreras: Carrera[] = [];
  //VARIABLE DE DOCENTES
  public docentes: Docente[] = [];
  //VARIABLE DE EMPRESA
  public empresas: Empresa[] = [];
  //VARIABLE DE CARRERAS
  //public carreras: Carrera[] = [];


  constructor(
    private docenteService: DocenteService,
    private carreraService: CarreraService,
    private empresaService: EmpresaService,
  ) { }
  ngOnInit() {
    this.getCarreras();
    this.getEmpresas();
    this.getDocentes();
  }


  private getDocentes() {
    this.docenteService.getDocentes().subscribe((docentes) => {
      this.docentes = docentes;
    });
  }


  private getCarreras() {
    this.carreraService.getCarreras().subscribe((carreras) => {
      this.carreras = carreras;
    });
  }


  private getEmpresas() {
    this.empresaService.getEmpresas().subscribe((empresas) => {
      this.empresas = empresas;
    });
  }
}
