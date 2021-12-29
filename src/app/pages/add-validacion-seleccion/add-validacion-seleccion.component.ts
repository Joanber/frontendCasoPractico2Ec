import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Alumno } from "src/app/models/alumno.model";
import { Convocatoria } from "src/app/models/convocatoria.model";
import { SolicitudAlumno } from "src/app/models/solicitudAlumno.model";
import { SolicitudEmpresa } from "src/app/models/solicitudEmpresa.model";
import { ValidacionSAC } from "src/app/models/validaciones_sac.model";
import { ConvocatoriasService } from "src/app/services/services.models/convocatorias.service";
import { SolicitudAlumnoService } from "src/app/services/services.models/solicitudes-alumnos.service";
import { ValidacionesSacService } from "src/app/services/services.models/validaciones-sac.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-validacion-seleccion",
  templateUrl: "./add-validacion-seleccion.component.html",
  styleUrls: ["./add-validacion-seleccion.component.css"],
})
export class AddValidacionSeleccionComponent implements OnInit {
  public solicitudEmpresa = new SolicitudEmpresa();
  public validacionSAC = new ValidacionSAC();
  public convocatoria = new Convocatoria();
  public alumnos = new Alumno();

  public formSubmitted = false;

  //VARIABLE DE PERSONAS
  public solicitudesAlumnos: SolicitudAlumno[] = [];
  public alumnosXconvocatoria: SolicitudAlumno[] = [];

  public validacionesSac: ValidacionSAC [] = [];

  //variable para guardar los alumnos seleccionados

  alumnosSelect: any;



  //Variable fecha
  today = new Date();
  jstoday = "";

  constructor(
    private validacionesSacService: ValidacionesSacService,
    private convocatoriaService: ConvocatoriasService,
    private solicitudAlumnosService: SolicitudAlumnoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) =>
      this.cargarConvocatoria(id)
    );

    this.getSolicitudesAlumnos();
  }
  cargarConvocatoria(id: number) {
    if (!id) {
      return;
    }
    this.convocatoriaService
      .getConvocatoriaById(id)
      .subscribe((convocatoria) => {
        this.convocatoria = convocatoria;
      });
  }
  getSolicitudesAlumnos() {
    this.solicitudAlumnosService
      .getSolicitudesAlumnos()
      .subscribe((solicitudes) => {
        this.solicitudesAlumnos = solicitudes;
        for (let i = 0; i < this.solicitudesAlumnos.length; i++) {
          if (
            this.convocatoria.id === this.solicitudesAlumnos[i].convocatoria.id
          ) {
            this.alumnosXconvocatoria.push(this.solicitudesAlumnos[i]);
          }
        }
      });
  }

  guardarSeleccionEstudiantes(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    if (this.validacionSAC.id) {
      this.validacionSAC.convocatoria = this.convocatoria;
      for (let i = 0; i < this.alumnosXconvocatoria.length; i++) {
        this.validacionSAC.alumnos.push(this.alumnosXconvocatoria[i].alumno);
      }
      this.validacionesSacService
        .editar(this.validacionSAC, this.validacionSAC.id)
        .subscribe((validacion) => {
          Swal.fire(
            "Actualizar Respuesta a empresa",
            `¡${validacion.convocatoria.solicitudEmpresa.empresa.nombre} actualizada con exito!`,
            "success"
          );
          this.irListarespuestaEmpresas();
        });
    } else {
      if (this.convocatoria.id) {
        this.validacionSAC.convocatoria = this.convocatoria;
        for (let i = 0; i < this.alumnosXconvocatoria.length; i++) {
          this.validacionSAC.alumnos.push(this.alumnosXconvocatoria[i].alumno);
        }
        this.validacionesSacService
          .crear(this.validacionSAC)
          .subscribe((validacion) => {
            Swal.fire(
              "Nueva Respuesta a empresa",
              `¡ Respuesta a empresa ${validacion.convocatoria.solicitudEmpresa.empresa.nombre} creada con exito!`,
              "success"
            );
            this.irListarespuestaEmpresas();
          });
      }
    }
  }

  irListarespuestaEmpresas() {}
  irConvocatorias() {
    this.router.navigateByUrl("/dashboard/convocatorias");
  }
}
