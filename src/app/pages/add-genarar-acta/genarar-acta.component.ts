import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { formatDate } from "@angular/common";
import { ValidacionesSacService } from "src/app/services/services.models/validaciones-sac.service";
import { DesignacionTaService } from "src/app/services/services.models/designacion-ta.service";
import { AlumnoService } from "src/app/services/services.models/alumno.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DesignacionTA } from "src/app/models/designacionta.model";
import { ValidacionSAC } from "src/app/models/validaciones_sac.model";
import { Alumno } from "src/app/models/alumno.model";
import { DesignacionTEService } from "src/app/services/services.models/designacion-te.service";
import { DesignacionTE } from "src/app/models/designacionte.model";
import { ActaDR } from "src/app/models/actaDR.model";
import { NgForm } from "@angular/forms";
import { ActaService } from "src/app/services/services.models/acta.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-genarar-acta",
  templateUrl: "./genarar-acta.component.html",
  styleUrls: ["./genarar-acta.component.css"],
  providers: [DatePipe],
})
export class GenararActaComponent implements OnInit {
  public designacionta = new DesignacionTA();
  public designacionte = new DesignacionTE();
  public validacionSac = new ValidacionSAC();
  public alumno = new Alumno();
  public acta = new ActaDR();
  public formSubmitted = false;

  public identificacion: string = "";
  public nombres: string = "";

  today = new Date();
  jstoday = "";
  constructor(
    private validacionesSacService: ValidacionesSacService,
    private designacionTAService: DesignacionTaService,
    private designacionTeService: DesignacionTEService,
    private actaService: ActaService,
    private alumnoService: AlumnoService,
    private activatedRoute: ActivatedRoute,
    private miDatePipe: DatePipe,
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
      this.validacion_sacById(id)
    );
    this.activatedRoute.params.subscribe(({ ida }) => this.getByIdAlumno(ida));
    this.activatedRoute.params.subscribe(({ idd }) =>
      this.getDesignacionByAlumnoId(idd)
    );
    this.activatedRoute.params.subscribe(({ ida }) => this.getTutorE(ida));
  }
  private validacion_sacById(id: number) {
    if (!id) {
      return;
    }
    this.validacionesSacService.getValidacionSacById(id).subscribe((val) => {
      this.validacionSac = val;
    });
  }
  private getTutorE(ida: number) {
    this.designacionTeService
      .getDesignacionTEByAlumnoId(ida)
      .subscribe((te) => {
        this.designacionte = te;
      });
  }
  private getByIdAlumno(ida: number) {
    if (!ida) {
      return;
    }
    this.alumnoService.getById(ida).subscribe((alumno) => {
      this.alumno = alumno;
    });
  }

  private getDesignacionByAlumnoId(idd: number) {
    if (!idd) {
      return;
    } else {
      this.designacionTAService
        .getDesignacionTAByAlumnoId(idd)
        .subscribe((designacionTA) => {
          this.designacionta = designacionTA;
          this.identificacion =
            this.designacionta.docente.persona.identificacion;
          this.nombres =
            this.designacionta.docente.persona.primer_nombre.concat(" ") +
            this.designacionta.docente.persona.primer_apellido;
          this.validacionesSacService
            .getValidacionSacByAlumnoId(idd)
            .subscribe((validacionSac) => (this.validacionSac = validacionSac));
        });
    }
  }

  guardarActa(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }

      const fechaFormateadaFIn = this.miDatePipe.transform(
        this.acta.fecha_fin_ppp,
        'yyyy-MM-dd'
      );
      this.acta.fecha_fin_ppp = fechaFormateadaFIn;
      this.acta.alumno = this.alumno;
      this.acta.actividadesActasDR = null;

      this.actaService
          .crear(this.acta)
          .subscribe((acta) => {
            Swal.fire(
              'Nueva Acta',
              `¡ Acta creada con exito!`,
              'success'
            );
            this.irListaActas();
          });
      }
      irListaActas(){}
    }
