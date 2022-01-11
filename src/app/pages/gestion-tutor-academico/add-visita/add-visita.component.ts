import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Actividadesvi } from "src/app/models/actividadesvi.model";
import { Alumno } from "src/app/models/alumno.model";
import { InformeVisita } from "src/app/models/informevisita.model";
import { Visita } from "src/app/models/visita.model";
import { AlumnoService } from "src/app/services/services.models/alumno.service";
import { DesignacionTaService } from "src/app/services/services.models/designacion-ta.service";
import { DesignacionTEService } from "src/app/services/services.models/designacion-te.service";
import { ValidacionesSacService } from "src/app/services/services.models/validaciones-sac.service";
import { VisitaService } from "src/app/services/services.models/visita.service";
import { DesignacionTA } from "src/app/models/designacionta.model";
import { DesignacionTE } from "src/app/models/designacionte.model";
import { ValidacionSAC } from "src/app/models/validaciones_sac.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-visita",
  templateUrl: "./add-visita.component.html",
  styleUrls: ["./add-visita.component.css"],
  providers: [DatePipe],
})
export class AddVisitaComponent implements OnInit {
  public visita = new Visita();
  public informeVisita = new InformeVisita();
  public actividadesvi: Actividadesvi[] = [];
  public alumnos: Alumno[] = [];
  public alumno = new Alumno();
  public designacionTA = new DesignacionTA();
  public designacionTE = new DesignacionTE();
  public validacionSac = new ValidacionSAC();
  public abrirDIV = false;
  public formSubmitted = false;

  constructor(
    private visitaService: VisitaService,
    private alumnoService: AlumnoService,
    private designacionTAService: DesignacionTaService,
    private designacionTEService: DesignacionTEService,
    private validacionesSacService: ValidacionesSacService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private miDatePipe: DatePipe
  ) {}

  ngOnInit() {
    this.cargarAlumnos();
    this.cargarActividadesvi();
    this.activatedRoute.params.subscribe(({ id }) => this.getVisitaById(id));
  }
  guardarVisita() {
    if (this.visita.informevisita.length > 0) {
      if (this.visita.id) {
        this.visitaService
          .editar(this.visita, this.visita.id)
          .subscribe((vis) => {
            Swal.fire(
              "Actualizar Visita",
              `Visita actualizada con exito!`,
              "success"
            );
            this.irListaVisitas();
          });
      } else {
        this.visitaService.crear(this.visita).subscribe((vis) => {
          Swal.fire("Nueva Visita", `Visita creada con exito!`, "success");
          this.irListaVisitas();
        });
      }
    }
  }

  agregarInformeVisita(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    } else {
      if (this.informeVisita.actividadesvi.length > 0) {
        const fechaFormateada = this.miDatePipe.transform(
          this.informeVisita.fecha,
          "yyyy-MM-dd"
        );
        this.informeVisita.fecha = fechaFormateada;
        this.visita.informevisita.push(this.informeVisita);
        this.informeVisita = new InformeVisita();
        this.abrirDIV = false;
      } else {
        return;
      }
    }
  }

  public getDesignacionTAandTEByAlumnoId(id: number) {
    if (!id) {
      return;
    } else {
      this.designacionTAService
        .getDesignacionTAByAlumnoId(id)
        .subscribe((designacionTA) => {
          this.designacionTA = designacionTA;
        });
      this.designacionTEService
        .getDesignacionTEByAlumnoId(id)
        .subscribe((designacionTE) => {
          this.designacionTE = designacionTE;
        });

      this.validacionesSacService
        .getValidacionSacByAlumnoId(id)
        .subscribe((validacionSac) => (this.validacionSac = validacionSac));
    }
  }
  public onChange(event, actividadvi: Actividadesvi) {
    const checked = event.target.checked;
    if (checked) {
      this.informeVisita.actividadesvi.push(actividadvi);
    } else {
      this.informeVisita.actividadesvi =
        this.informeVisita.actividadesvi.filter(
          (actvi) => actvi.descripcion != actividadvi.descripcion
        );
    }
  }

  eliminarItemInforme(asunto: string) {
    this.visita.informevisita = this.visita.informevisita.filter(
      (informeVisita: InformeVisita) => asunto != informeVisita.asunto
    );
  }
  private cargarActividadesvi() {
    this.visitaService
      .getActividadesInformesVisitas()
      .subscribe((actividadesvi) => (this.actividadesvi = actividadesvi));
  }
  private cargarAlumnos() {
    this.alumnoService
      .getAlumnosTAandTEtrue()
      .subscribe((alumnos) => (this.alumnos = alumnos));
  }

  abrirDiv() {
    this.abrirDIV = true;
  }
  irListaVisitas() {
    this.router.navigateByUrl("/dashboard/visitas");
  }
  compararAlumno(d1: Alumno, d2: Alumno) {
    if (d1 === undefined && d2 === undefined) {
      return true;
    }
    return d1 == null || d2 == null ? false : d1.id === d2.id;
  }

  getVisitaById(id: number) {
    if (!id) {
      return;
    } else {
      this.visitaService.getVisitaById(id).subscribe((visita) => {
        this.visita = visita;

        this.designacionTAService
          .getDesignacionTAByAlumnoId(this.visita.alumno.id)
          .subscribe((designacionTA) => {
            this.designacionTA = designacionTA;
          });
        this.designacionTEService
          .getDesignacionTEByAlumnoId(this.visita.alumno.id)
          .subscribe((designacionTE) => {
            this.designacionTE = designacionTE;
          });

        this.validacionesSacService
          .getValidacionSacByAlumnoId(this.visita.alumno.id)
          .subscribe((validacionSac) => (this.validacionSac = validacionSac));
      });
    }
  }
}
