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

  public docente: Docente[] = [];
  public formSubmitted = false;

  public identificacion: string = "";
  public nombres: string = "";

  today = new Date();
  jstoday = "";

  constructor(
    private validacionesSacService: ValidacionesSacService,
    private docenteService: DocenteService,
    private designacionTAService: DesignacionTaService,
    private alumnoService: AlumnoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) =>
      this.validacion_sacById(id)
    );
    this.activatedRoute.params.subscribe(({ id }) => this.getByIdAlumno(id));

    this.activatedRoute.params.subscribe(({ idd }) =>
      this.getDesignacionByAlumnoId(idd)
    );
    this.cargarDocentes();
  }

  private validacion_sacById(id: number) {
    if (!id) {
      return;
    }
    this.validacionesSacService.getValidacionSacById(id).subscribe((val) => {
      this.validacionSac = val;
    });
  }
  private getByIdAlumno(id: number) {
    if (!id) {
      return;
    }
    this.alumnoService.getById(id).subscribe((alumno) => {
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
  capturarDatos() {
    this.identificacion = this.designacionta.docente.persona.identificacion;
    this.nombres =
      this.designacionta.docente.persona.primer_nombre.concat(" ") +
      this.designacionta.docente.persona.primer_apellido;
  }
  private cargarDocentes() {
    this.docenteService.getDocentes().subscribe((docente) => {
      this.docente = docente;
    });
  }
  guardarDesignacionTA() {}

  irValidaciones() {
    this.router.navigateByUrl("/dashboard/respuestas-empresas");
  }
}
