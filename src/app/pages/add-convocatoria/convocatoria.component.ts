import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { formatDate } from "@angular/common";
import { Convocatoria } from "src/app/models/convocatoria.model";
import { ConvocatoriasService } from "src/app/services/services.models/convocatorias.service";
import Swal from "sweetalert2";
import { SolicitudEmpresa } from "src/app/models/solicitudEmpresa.model";
import { SolicitudEmpresaService } from "src/app/services/services.models/solicitud-empresa.service";
@Component({
  selector: "app-convocatoria",
  templateUrl: "./convocatoria.component.html",
  styleUrls: ["./convocatoria.component.css"],
  providers: [DatePipe],
})
export class ConvocatoriaComponent implements OnInit {
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
    private router: Router,
    private miDatePipe: DatePipe
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
    this.activatedRoute.params.subscribe(({ idc }) =>
      this.cargarConvocatoriaById(idc)
    );
  }

  guardarConvocatoria(form: NgForm) {
    this.formSubmitted = true;

    if (this.solicitudEmpresa.id) {
      const fechaFormateadaMax_recib = this.miDatePipe.transform(
        this.convocatoria.fecha_max_recib_solic,
        "yyyy-MM-dd"
      );
      this.convocatoria.fecha_max_recib_solic = fechaFormateadaMax_recib;
      this.convocatoria.solicitudEmpresa = this.solicitudEmpresa;
      this.convocatoria.carrera = this.solicitudEmpresa.responsablePPP.carrera;
      this.convocatoria.estado = true;
      this.convocatoriaService
        .crear(this.convocatoria)
        .subscribe((convocatoria) => {
          Swal.fire(
            "Nueva Convocatoria",
            `¡ Convocatoria de ${convocatoria.carrera.abreviatura} creada con exito!`,
            "success"
          );
          this.irListaConvocatorias();
        });
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
          return this.irListaConvocatorias();
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
