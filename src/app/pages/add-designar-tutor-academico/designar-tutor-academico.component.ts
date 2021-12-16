import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera.model';
import { Docente } from 'src/app/models/docente.model';
import { Empresa } from 'src/app/models/empresa.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { DocenteService } from 'src/app/services/services.models/docente.service';
import { EmpresaService } from 'src/app/services/services.models/empresa.service';

@Component({
  selector: 'app-designar-tutor-academico',
  templateUrl: './designar-tutor-academico.component.html',
  styleUrls: ['./designar-tutor-academico.component.css']
})
export class DesignarTutorAcademicoComponent implements OnInit {

  //VARIABLE DE CARRERAS
  public carreras: Carrera[] = [];
  //VARIABLE DE DOCENTES
  public docentes: Docente[] = [];
  public empresas: Empresa[] = [];
  //VARIABLE DE CARRERAS

  constructor(
    private empresasService: EmpresaService,
    private docenteService: DocenteService,
    private carreraService: CarreraService) { }

  ngOnInit() {
    this.getCarreras();
    this.getDocentes();
    this.getEmpresas();
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
    this.empresasService.getEmpresas().subscribe((empresas) => {
      this.empresas = empresas;
    });
  }
}
