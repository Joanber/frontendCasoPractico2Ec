import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ActaDR } from "src/app/models/actaDR.model";
import { ActividadesActasDR } from "src/app/models/actividadesActasDR.model";
import { DesignacionTA } from "src/app/models/designacionta.model";
import { DetallesSeguimiento } from "src/app/models/detalles-seguimiento.model";
import { Seguimiento } from "src/app/models/seguimiento.model";
import { ValidacionSAC } from "src/app/models/validaciones_sac.model";
import { ActaService } from "src/app/services/services.models/acta.service";
import { DesignacionTaService } from "src/app/services/services.models/designacion-ta.service";
import { SeguimientoService } from "src/app/services/services.models/seguimiento.service";
import { ValidacionesSacService } from "src/app/services/services.models/validaciones-sac.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-seguimiento",
  templateUrl: "./add-seguimiento.component.html",
  styleUrls: ["./add-seguimiento.component.css"],
  providers: [DatePipe],
})
export class AddSeguimientoComponent implements OnInit {
  public designacionTA = new DesignacionTA();
  public validacionSac = new ValidacionSAC();
  public actividades_actasdr: ActividadesActasDR[] = [];
  public detalleSeguimiento = new DetallesSeguimiento();
  public actaDR = new ActaDR();
  public seguimiento = new Seguimiento();
  public abrirDIV = false;
  public formSubmitted = false;
  public existeActividadTable = false;

  constructor(
    private designacionTAService: DesignacionTaService,
    private validacionesSacService: ValidacionesSacService,
    private actaDRService: ActaService,
    private seguimientoService: SeguimientoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private miDatePipe: DatePipe
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ ida }) =>
      this.getDesignacionTAByAlumnoId(ida)
    );
    this.activatedRoute.params.subscribe(({ id }) =>
      this.getSeguimientoByAlumnoId(id)
    );
  }

  private getDesignacionTAByAlumnoId(ida: number) {
    if (!ida) {
      return;
    } else {
      this.designacionTAService
        .getDesignacionTAByAlumnoId(ida)
        .subscribe((designacionTA) => {
          this.designacionTA = designacionTA;
        });
      this.validacionesSacService
        .getValidacionSacByAlumnoId(ida)
        .subscribe((validacionSac) => (this.validacionSac = validacionSac));
      this.actaDRService.getActaRDByAlumnoId(ida).subscribe((actaDR) => {
        this.actaDR = actaDR;
        this.actividades_actasdr = this.actaDR.actividadesActasDR;
      });
    }
  }
  getSeguimientoByAlumnoId(id: number) {
    if (!id) {
      return;
    } else {
      this.seguimientoService
        .getSeguimientoById(id)
        .subscribe((seguimiento) => {
          this.seguimiento = seguimiento;
        });
      this.designacionTAService
        .getDesignacionTAByAlumnoId(id)
        .subscribe((designacionTA) => {
          this.designacionTA = designacionTA;
        });
      this.validacionesSacService
        .getValidacionSacByAlumnoId(id)
        .subscribe((validacionSac) => (this.validacionSac = validacionSac));
      this.actaDRService.getActaRDByAlumnoId(id).subscribe((actaDR) => {
        this.actaDR = actaDR;
        this.actividades_actasdr = this.actaDR.actividadesActasDR;
      });
    }
  }

  agregarDetalleSeguimiento(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    } else {
      if (this.existeActividad(this.detalleSeguimiento.actividadesActasDR.id)) {
        this.existeActividadTable = true;
      } else {
        const fechaFormateada = this.miDatePipe.transform(
          this.detalleSeguimiento.fecha,
          "yyyy-MM-dd"
        );
        this.detalleSeguimiento.fecha = fechaFormateada;

        const fechaFormateadaFin = this.miDatePipe.transform(
          this.detalleSeguimiento.fecha_fin_pre,
          "yyyy-MM-dd"
        );
        this.detalleSeguimiento.fecha_fin_pre = fechaFormateadaFin;
        this.seguimiento.detallesSeguimiento.push(this.detalleSeguimiento);
        console.log(this.seguimiento);
        this.detalleSeguimiento = new DetallesSeguimiento();
        this.abrirDIV = false;
      }
    }
  }
  guardarSeguimiento() {
    if (this.seguimiento.detallesSeguimiento.length > 0) {
      if (this.seguimiento.id) {
        this.seguimiento.alumno = this.designacionTA.alumno;
        this.seguimientoService
          .editar(this.seguimiento, this.seguimiento.id)
          .subscribe((seg) => {
            Swal.fire(
              "Actualizar Seguimiento",
              `Seguimiento actualizado con exito!`,
              "success"
            );
            this.irListaSeguimientos();
          });
      } else {
        this.seguimiento.alumno = this.designacionTA.alumno;
        this.seguimientoService
          .crear(this.seguimiento)
          .subscribe((seguimiento) => {
            Swal.fire(
              "Nuevo Seguimiento",
              `Seguimiento creado con exito!`,
              "success"
            );
            this.irListaSeguimientos();
          });
      }
    }
  }

  private existeActividad(id: number): boolean {
    let existe = false;
    this.seguimiento.detallesSeguimiento.forEach((detalle) => {
      if (id === detalle.actividadesActasDR.id) {
        existe = true;
      }
    });
    return existe;
  }
  public eliminarItemDetalle(id: number) {
    this.seguimiento.detallesSeguimiento =
      this.seguimiento.detallesSeguimiento.filter(
        (detalle: DetallesSeguimiento) => id != detalle.actividadesActasDR.id
      );
  }
  abrirDiv() {
    this.abrirDIV = true;
  }
  irListaSeguimientos() {
    this.router.navigateByUrl("/dashboard/seguimientos");
  }
}
