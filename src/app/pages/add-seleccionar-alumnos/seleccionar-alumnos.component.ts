import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno.model';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { SolicitudAlumno } from 'src/app/models/solicitudAlumno.model';
import { SolicitudEmpresa } from 'src/app/models/solicitudEmpresa.model';
import { ConvocatoriasService } from 'src/app/services/services.models/convocatorias.service';
import { SolicitudEmpresaService } from 'src/app/services/services.models/solicitud-empresa.service';
import { SolicitudesAlumnosService } from 'src/app/services/services.models/solicitudes-alumnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seleccionar-alumnos',
  templateUrl: './seleccionar-alumnos.component.html',
  styleUrls: ['./seleccionar-alumnos.component.css']
})
export class SeleccionarAlumnosComponent implements OnInit {

  public solicitudEmpresa = new SolicitudEmpresa();
  public convocatoria = new Convocatoria();
  public formSubmitted = false;
  public solicitudAlumnos: SolicitudAlumno[] = [];
  public alumno: Alumno[] = [];
  public AlumnosSelect: Alumno[] = [];
  public convocatorias: Convocatoria[] = [];
  ultimoElemento = 1;
  //Variable fecha
  today = new Date();
  jstoday = "";

  constructor(
    private solicitudEmpresaService: SolicitudEmpresaService,
    private solicitudAlumnoService: SolicitudesAlumnosService,
    private convocatoriaService: ConvocatoriasService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.jstoday = formatDate(
      this.today,
      "dd-MM-yyyy hh:mm:ss a",
      "en-US",
      "+0530"
    );
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) =>
      this.cargarSolicitudEmpresa(id)
    );
    this.cargarSolicitudAlumno();
    this.cargarConvocatoria();
  }

  guardarSeleccionEstudiantes(form: NgForm) {
    // this.formSubmitted = true;
    // if (this.convocatoria.id) {
    //   this.convocatoria.solicitudEmpresa = this.solicitudEmpresa;
    //   this.convocatoria.carrera = this.solicitudEmpresa.responsablePPP.carrera;
    //   this.convocatoria.estado = true;
    //   this.convocatoriaService
    //     .editar(this.convocatoria, this.convocatoria.id)
    //     .subscribe((convocatoria) => {
    //       Swal.fire(
    //         "Actualizar Convocatoria",
    //         `¡${convocatoria.id} actualizada con exito!`,
    //         "success"
    //       );
    //       this.irListaConvocatorias();
    //     });
    // } else {
    //   if (this.solicitudEmpresa.id) {
    //     this.convocatoria.solicitudEmpresa = this.solicitudEmpresa;
    //     this.convocatoria.carrera =
    //       this.solicitudEmpresa.responsablePPP.carrera;
    //     this.convocatoria.estado = true;
    //     this.convocatoriaService
    //       .crear(this.convocatoria)
    //       .subscribe((convocatoria) => {
    //         Swal.fire(
    //           "Nueva Convocatoria",
    //           `¡ Convocatoria creada con exito!`,
    //           "success"
    //         );
    //         this.irListaConvocatorias();
    //       });
    //   }
    // }
  }

  cargarSolicitudEmpresa(id: number) {
    if (!id) {
      return;
    }
    this.solicitudEmpresaService
      .getSolicitudEmpresaById(id)
      .subscribe((solicitudEmpresa) => {
        if (!solicitudEmpresa) {
          return this.irListaConvocatorias();
        }
        this.solicitudEmpresa = solicitudEmpresa;
        for (var i = 0; i >= this.convocatorias.length; i++) {
          if (this.solicitudEmpresa.id == this.convocatorias[i].solicitudEmpresa.id) {
            for (var  j= 0; j >= this.solicitudAlumnos.length; j++) {
            var person=this.solicitudAlumnos[j].alumno.id;
            this.AlumnosSelect[j]=this.alumno[j];
          }
        }}
      });
  }
  cargarConvocatoria() {
    this.convocatoriaService.getConvocatorias().subscribe((convocatoria) => {
      this.convocatorias = convocatoria;
    });
  }
  cargarSolicitudAlumno() {
    this.solicitudAlumnoService.getSolicitudesAlumnos().subscribe((solicitudAlumno) => {
        this.solicitudAlumnos = solicitudAlumno;
      });
  }
  irListaConvocatorias() {
    this.router.navigateByUrl("/dashboard/convocatorias");
  }
  irListaSolicitudes() {
    this.router.navigateByUrl("/dashboard/solicitudes_empresas");
  }
}