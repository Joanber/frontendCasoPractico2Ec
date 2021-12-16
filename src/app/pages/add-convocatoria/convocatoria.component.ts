import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Carrera } from 'src/app/models/carrera.model';
import { Docente } from 'src/app/models/docente.model';
import { Empresa } from 'src/app/models/empresa.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { DocenteService } from 'src/app/services/services.models/docente.service';
import { EmpresaService } from 'src/app/services/services.models/empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-convocatoria',
  templateUrl: './convocatoria.component.html',
  styleUrls: ['./convocatoria.component.css']
})
export class ConvocatoriaComponent implements OnInit {
  public formSubmitted = false;
  public carrera = new Carrera();
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



  private guardarConvocatoria(form: NgForm) {
  }
  /*  this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    if (this.carrera.id) {
      const fechaFormateadaInicio = this.miDatePipe.transform(
        this.carrera.fecha_inicio,
        "yyyy-MM-dd"
      );
      this.carrera.fecha_inicio = fechaFormateadaInicio;

      const fechaFormateadaFin = this.miDatePipe.transform(
        this.carrera.fecha_fin,
        "yyyy-MM-dd"
      );
      this.carrera.fecha_fin = fechaFormateadaFin;

      this.carreraService
        .editar(this.carrera, this.carrera.id)
        .subscribe((carrera) => {
          Swal.fire(
            "Actualizar Carrera",
            `¡${carrera.nombre} actualizada con exito!`,
            "success"
          );
          this.irListaCarreras();
        });
    } else {
      const fechaFormateadaInicio = this.miDatePipe.transform(
        this.carrera.fecha_inicio,
        "yyyy-MM-dd"
      );
      this.carrera.fecha_inicio = fechaFormateadaInicio;

      const fechaFormateadaFin = this.miDatePipe.transform(
        this.carrera.fecha_fin,
        "yyyy-MM-dd"
      );
      this.carrera.fecha_fin = fechaFormateadaFin;
      this.carreraService.crear(this.carrera).subscribe((carrera) => {
        Swal.fire(
          "Nueva Carrera",
          `¡${carrera.nombre} creada con exito!`,
          "success"
        );
        this.irListaCarreras();
      });
    }
  }

  irListaCarreras() {
    this.router.navigateByUrl("/dashboard/convocatorias");
  }
*/
}
