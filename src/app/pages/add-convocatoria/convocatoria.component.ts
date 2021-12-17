import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Carrera } from 'src/app/models/carrera.model';
import { Docente } from 'src/app/models/docente.model';
import { Empresa } from 'src/app/models/empresa.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { DocenteService } from 'src/app/services/services.models/docente.service';
import { EmpresaService } from 'src/app/services/services.models/empresa.service';

import * as moment from 'moment';
import { ThrowStmt } from '@angular/compiler';
import { formatDate } from '@angular/common';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { ConvocatoriasService } from 'src/app/services/services.models/convocatorias.service';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { environment } from 'src/environments/environment';
const bd_url = environment.bd_url;
import Swal from 'sweetalert2';
@Component({
  selector: 'app-convocatoria',
  templateUrl: './convocatoria.component.html',
  styleUrls: ['./convocatoria.component.css']
})
export class ConvocatoriaComponent implements OnInit {
  autocompleteControl = new FormControl();
  public convocatoria = new Convocatoria();
   public formSubmitted = false;
  public bd_url = bd_url + "/personas";

  //VARIABLE DE CARRERAS
  public carreras: Carrera[] = [];
  //VARIABLE DE DOCENTES
  public docentes: Docente[] = [];
  //VARIABLE DE ASIGNATURA
  //public asignaturas: Asignatura[] = [];
  //VARIABLE DE CICLO
  //public ciclos: Ciclo[] = [];

  //VARIABLE DE EMPRESA
  public empresas: Empresa[] = [];
  //VARIABLE DE CARRERAS
  //public carreras: Carrera[] = [];

  //VARIABLE DE CONVOCATORIAS
  public convocatorias: Convocatoria [] =[];
  ultimoElemento=1;
  //Variable fecha
  today = new Date();
  jstoday = '';

  constructor(
    private docenteService: DocenteService,
    private carreraService: CarreraService,
    private empresaService: EmpresaService,
    private convocatoriaService: ConvocatoriasService,
    private miDatePipe: DatePipe,
  private router: Router,


  ) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');

  }

  ngOnInit() {
    this.getCarreras();
    this.getEmpresas();
    this.getDocentes();
    this.numeroconvocatoria();
  }

  private getCarreras() {
    this.carreraService.getCarreras().subscribe((carreras) => {
      this.carreras = carreras;
    });
  }

  private getDocentes() {
    this.docenteService.getDocentes().subscribe((docentes) => {
      this.docentes = docentes;
    });
  }


  private getEmpresas() {
    this.empresaService.getEmpresas().subscribe((empresas) => {
      this.empresas = empresas;
    });
  }

  private numeroconvocatoria() {
    this.convocatoriaService.getConvocatorias().subscribe((convocatorias) => {

      this.convocatorias = convocatorias;
      this.ultimoElemento = (convocatorias.length - 1)+1;

    });
  }


  guardarConvocatoria(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    if (this.convocatoria.id) {
      const fechaFormateadaInicio = this.miDatePipe.transform(
        this.convocatoria.fecha_emision,
        "yyyy-MM-dd"
      );
      this.convocatoria.fecha_emision = fechaFormateadaInicio;

      const fechaFormateadaFin = this.miDatePipe.transform(
        this.convocatoria.fecha_max_recib_solic,
        "yyyy-MM-dd"
      );
      this.convocatoria.fecha_max_recib_solic = fechaFormateadaFin;

      this.convocatoriaService
        .editar(this.convocatoria, this.convocatoria.id)
        .subscribe((convocatoria) => {
          Swal.fire(
            "Actualizar Carrera",
            `¡${convocatoria.id} actualizada con exito!`,
            "success"
          );
          this.irListaCarreras();
        });
    } else {
      const fechaFormateadaInicio = this.miDatePipe.transform(
        this.convocatoria.fecha_emision,
        "yyyy-MM-dd"
      );
      this.convocatoria.fecha_emision = fechaFormateadaInicio;

      const fechaFormateadaFin = this.miDatePipe.transform(
        this.convocatoria.fecha_max_recib_solic,
        "yyyy-MM-dd"
      );
      this.convocatoria.fecha_max_recib_solic = fechaFormateadaFin;
      this.convocatoriaService.crear(this.convocatoria).subscribe((convocatoria) => {
        Swal.fire(
          "Nueva Carrera",
          `¡${convocatoria.id} creada con exito!`,
          "success"
        );
        this.irListaCarreras();
      });
    }
  }

  irListaCarreras() {
    this.router.navigateByUrl("/dashboard/carreras");
  }


}
