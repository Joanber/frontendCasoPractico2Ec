import { Component, OnInit } from '@angular/core';
import { DatePipe, formatDate } from "@angular/common";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Empresa } from "src/app/models/empresa.model";
import { ResponsablePPP } from "src/app/models/responsablePPP.model";
import { SolicitudEmpresa } from "src/app/models/solicitudEmpresa.model";
import { EmpresaService } from "src/app/services/services.models/empresa.service";
import { ResponsablePPPService } from "src/app/services/services.models/responsable-ppp.service";
import { SolicitudEmpresaService } from "src/app/services/services.models/solicitud-empresa.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-evaluacion-estudiante-empresa',
  templateUrl: './add-evaluacion-estudiante-empresa.component.html',
  styleUrls: ['./add-evaluacion-estudiante-empresa.component.css'],
  providers: [DatePipe],
})
export class AddEvaluacionEstudianteEmpresaComponent implements OnInit {

  public solicitudEmpresa = new SolicitudEmpresa();
  public responsablesPPP: ResponsablePPP[] = [];
  public empresas: Empresa[] = [];
  public formSubmitted = false;
  //Variable fecha
  today = new Date();
  jstoday = "";

  constructor(
    private router: Router,
    private solicitudEmpresaService: SolicitudEmpresaService,
    private responsablePPPService: ResponsablePPPService,
    private empresaService: EmpresaService,
    private miDatePipe: DatePipe,
    private activatedRoute: ActivatedRoute
  ) {
    this.jstoday = formatDate(
      this.today,
      "dd-MM-yyyy hh:mm:ss a",
      "en-US",
      "+0530"
    );
  }

  ngOnInit() {
    this.cargaResponsablesPPP();
    this.cargarEmpresas();
    this.activatedRoute.params.subscribe(({ id }) =>
      this.cargarSolicitudEmpresa(id)
    );
  }

  guardarSolicitudEmpresa(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    if (this.solicitudEmpresa.id) {
      const fechaInicioFormat = this.miDatePipe.transform(
        this.solicitudEmpresa.fecha_inicio,
        "yyyy-MM-dd"
      );
      this.solicitudEmpresa.fecha_inicio = fechaInicioFormat;

      this.solicitudEmpresaService
        .editar(this.solicitudEmpresa, this.solicitudEmpresa.id)
        .subscribe((solicitudEmpresa) => {
          Swal.fire(
            "Actualizar Solicitud",
            `Solicitud actualizada con exito!`,
            "success"
          );
          this.irListaSolicitudesEmpresas();
        });
    } else {
      const fechaInicioFormat = this.miDatePipe.transform(
        this.solicitudEmpresa.fecha_inicio,
        "yyyy-MM-dd"
      );
      this.solicitudEmpresa.fecha_inicio = fechaInicioFormat;

      this.solicitudEmpresaService
        .crear(this.solicitudEmpresa)
        .subscribe((solicitudEmpresa) => {
          Swal.fire(
            "Nueva Solicitud",
            `¡ Solicitud creada con exito!`,
            "success"
          );
          this.irListaSolicitudesEmpresas();
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
          return this.irListaSolicitudesEmpresas();
        }
        this.solicitudEmpresa = solicitudEmpresa;
      });
  }
  private cargaResponsablesPPP() {
    this.responsablePPPService
      .getResponsablePPP()
      .subscribe((responsablesPPP) => {
        this.responsablesPPP = responsablesPPP;
      });
  }

  private cargarEmpresas() {
    this.empresaService
      .getEmpresas()
      .subscribe((empresas) => (this.empresas = empresas));
  }

  irListaSolicitudesEmpresas() {
    this.router.navigateByUrl("/dashboard/list-solicitud-empresa");
  }

  compararResponsable(d1: ResponsablePPP, d2: ResponsablePPP) {
    if (d1 === undefined && d2 === undefined) {
      return true;
    }
    return d1 == null || d2 == null ? false : d1.id === d2.id;
  }
  compararEmpresa(d1: Empresa, d2: Empresa) {
    if (d1 === undefined && d2 === undefined) {
      return true;
    }
    return d1 == null || d2 == null ? false : d1.id === d2.id;
  }
}
