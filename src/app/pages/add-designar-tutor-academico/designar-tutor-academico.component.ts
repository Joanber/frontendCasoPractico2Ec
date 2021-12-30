import { Component, OnInit } from "@angular/core";
import { ValidacionSAC } from "src/app/models/validaciones_sac.model";
import { Alumno } from "src/app/models/alumno.model";
import { ValidacionesSacService } from "src/app/services/services.models/validaciones-sac.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";
import { AlumnoService } from "src/app/services/services.models/alumno.service";
import { DesignacionTA } from "src/app/models/designacionta.model";
import { Docente } from "src/app/models/docente.model";
import { DocenteService } from "src/app/services/services.models/docente.service";
import { DesignacionTaService } from "src/app/services/services.models/designacion-ta.service";

@Component({
  selector: "app-designar-tutor-academico",
  templateUrl: "./designar-tutor-academico.component.html",
  styleUrls: ["./designar-tutor-academico.component.css"],
})
export class DesignarTutorAcademicoComponent implements OnInit {
  public designacionta = new DesignacionTA();
  public validacionSac = new ValidacionSAC();
  public alumno = new Alumno();
  public docentes: Docente[] = [];
  public formSubmitted = false;

  "";

  today = new Date();
  jstoday = "";

  constructor(
    private validacionesSacService: ValidacionesSacService,
    private designacionTAService: DesignacionTaService,
    private alumnoService: AlumnoService,
    private docenteService: DocenteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarDocentes();
    this.activatedRoute.params.subscribe(({ id }) =>
      this.validacion_sacById(id)
    );
    this.activatedRoute.params.subscribe(({ ida }) => this.getByIdAlumno(ida));
    this.activatedRoute.params.subscribe(({ idd }) =>
      this.getDesignacionByAlumnoId(idd)
    );
  }

  private validacion_sacById(id: number) {
    if (!id) {
      return;
    }
    this.validacionesSacService.getValidacionSacById(id).subscribe((val) => {
      this.validacionSac = val;
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

          this.validacionesSacService
            .getValidacionSacByAlumnoId(idd)
            .subscribe((validacionSac) => (this.validacionSac = validacionSac));
        });
    }
  }

  private cargarDocentes() {
    this.docenteService.getDocentes().subscribe((docentes) => {
      this.docentes = docentes;
    });
  }

  guardarDesignacionTA(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    if (this.designacionta.id) {
      this.designacionta.alumno = this.designacionta.alumno;
      this.designacionTAService
        .editar(this.designacionta, this.designacionta.id)
        .subscribe((designacionTa) => {
          Swal.fire(
            "Actualizar Tutor Academico",
            `Designacion Tutor Academico actualizada con exito!`,
            "success"
          );
          this.irListaRespuestasEmpresas();
        });
    } else {
      this.designacionta.alumno = this.alumno;
      this.designacionTAService
        .crear(this.designacionta)
        .subscribe((designacionTA) => {
          Swal.fire(
            "Nueva Designacion de Tutor Academico",
            `Nueva Designacion creada con exito!`,
            "success"
          );
          this.irListaRespuestasEmpresas();
        });
    }}
  irListaRespuestasEmpresas() {
    this.router.navigateByUrl("/dashboard/respuestas-empresas");
  }
}
