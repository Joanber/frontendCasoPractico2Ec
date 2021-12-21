import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Carrera } from 'src/app/models/carrera.model';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { Docente } from 'src/app/models/docente.model';
import { Empresa } from 'src/app/models/empresa.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { ConvocatoriasService } from 'src/app/services/services.models/convocatorias.service';
import { DocenteService } from 'src/app/services/services.models/docente.service';
import { EmpresaService } from 'src/app/services/services.models/empresa.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
//VARIABLE DE CARRERAS
 public carreras: Carrera[] = [];
//VARIABLE DE DOCENTES
 public docentes: Docente[] = [];
//VARIABLE DE EMPRESA
 public empresas: Empresa[] = [];
 //VARIABLE DE EMPRESA
 public convocatorias: Convocatoria[] = [];
//VARIABLE DE FECHA 
today = new Date();
jstoday = '';

  constructor(
    private empresasService: EmpresaService,
    private convocatoriasService: ConvocatoriasService,
    private docenteService: DocenteService,
    private carreraService: CarreraService) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');

   }

  ngOnInit() {
    this.getCarreras();
    this.getDocentes();
    this.getEmpresas();
    this.getConvocatorias();
    
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
  private getConvocatorias() {
    this.convocatoriasService.getConvocatorias().subscribe((convocatorias) => {
      this.convocatorias = convocatorias;
    });
  }

}
