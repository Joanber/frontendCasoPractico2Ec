import { Component, OnInit } from "@angular/core";

import { ConvocatoriasService } from "src/app/services/services.models/convocatorias.service";

import { DatePipe, formatDate } from "@angular/common";
import { Convocatoria } from "src/app/models/convocatoria.model";
import { SolicitudEmpresaService } from "src/app/services/services.models/solicitud-empresa.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SolicitudEmpresa } from "src/app/models/solicitudEmpresa.model";
import Swal from "sweetalert2";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-seleccion-estudiantes",
  templateUrl: "./seleccion-estudiantes.component.html",
  styleUrls: ["./seleccion-estudiantes.component.css"],
})
export class SeleccionEstudiantesComponent implements OnInit {
  public solicitudEmpresa = new SolicitudEmpresa();
  public convocatoria = new Convocatoria();
  public formSubmitted = false;

  ultimoElemento = 1;
  //Variable fecha
  today = new Date();
  jstoday = "";

  constructor(
    private solicitudEmpresaService: SolicitudEmpresaService,
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
  }

  guardarConvocatoria(form: NgForm) {
    this.formSubmitted = true;
    if (this.convocatoria.id) {
      this.convocatoria.solicitudEmpresa = this.solicitudEmpresa;
      this.convocatoria.carrera = this.solicitudEmpresa.responsablePPP.carrera;
      this.convocatoria.estado = true;
      this.convocatoriaService
        .editar(this.convocatoria, this.convocatoria.id)
        .subscribe((convocatoria) => {
          Swal.fire(
            "Actualizar Convocatoria",
            `¡${convocatoria.id} actualizada con exito!`,
            "success"
          );
          this.irListaConvocatorias();
        });
    } else {
      if (this.solicitudEmpresa.id) {
        this.convocatoria.solicitudEmpresa = this.solicitudEmpresa;
        this.convocatoria.carrera =
          this.solicitudEmpresa.responsablePPP.carrera;
        this.convocatoria.estado = true;
        this.convocatoriaService
          .crear(this.convocatoria)
          .subscribe((convocatoria) => {
            Swal.fire(
              "Nueva Convocatoria",
              `¡ Convocatoria creada con exito!`,
              "success"
            );
            this.irListaConvocatorias();
          });
      }
    }
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
      });
  }
  cargarConvocatoriaById(idc: number) {
    if (!idc) {
      return;
    }
    this.convocatoriaService
      .getConvocatoriaById(idc)
      .subscribe((convocatoria) => {
        if (!convocatoria) {
          //  return this.irListaConvocatorias();
        }
        this.solicitudEmpresa = convocatoria.solicitudEmpresa;
        this.convocatoria = convocatoria;
      });
  }

  irListaConvocatorias() {
    this.router.navigateByUrl("/dashboard/convocatorias");
  }
  irListaSolicitudes() {
    this.router.navigateByUrl("/dashboard/solicitudes_empresas");
  }
}
