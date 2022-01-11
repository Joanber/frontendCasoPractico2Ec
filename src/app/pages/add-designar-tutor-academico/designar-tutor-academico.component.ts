import { Component, OnInit } from "@angular/core";
import { Alumno } from "src/app/models/alumno.model";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import Swal from "sweetalert2";
import autoTable, { UserOptions } from "jspdf-autotable";
import jsPDF, * as jspdf from "jspdf";
import { DesignacionTA } from "src/app/models/designacionta.model";
import { ValidacionSAC } from "src/app/models/validaciones_sac.model";
import { Docente } from "src/app/models/docente.model";
import { ValidacionesSacService } from "src/app/services/services.models/validaciones-sac.service";
import { DesignacionTaService } from "src/app/services/services.models/designacion-ta.service";
import { AlumnoService } from "src/app/services/services.models/alumno.service";
import { DocenteService } from "src/app/services/services.models/docente.service";

interface jsPDFWithPlugin extends jspdf.jsPDF {
  [x: string]: any;

  autoTable: (optios: UserOptions) => jspdf.jsPDF;
}

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

  today = new Date();
  jstoday = "";

  // Variable para almanecar localmente
  public asistenciaStorage: any[] = [];

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
          this.alumno = this.designacionta.alumno;
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
    }
  }
  irListaRespuestasEmpresas() {
    this.router.navigateByUrl("/dashboard/respuestas-empresas");
  }

  async exportPdf() {
    const dataBody = [];
    const data = await this.asistenciaStorage;
    const doc = new jsPDF("p", "pt", "a4");
    doc.setFontSize(12);
    doc.text("ANEXO 6: Designación tutor académico ", 20, 80);
   // doc.text(this.designacionta.fecha_emision, 490, 120);
    doc.text("Magister", 40, 150);
    doc.text(
      this.designacionta.docente.persona.primer_nombre +
        " " +
        this.designacionta.docente.persona.segundo_nombre +
        " " +
        this.designacionta.docente.persona.primer_apellido +
        " " +
        this.designacionta.docente.persona.segundo_apellido,
      40,
      170
    );
    doc.text("INSTITUTO SUPERIOR TECNOLÓGICO DEL AZUAY", 40, 190);
    doc.text("Su Despacho. -", 40, 210);
    doc.text("De mi consideración: ", 40, 260);
    doc.text(
      "Luego de expresarle un atento saludo y desearle éxito en las funciones que acertadamente",
      40,
      280
    );
    doc.text(
      "realiza, me permito informarle ha sido designado como TUTOR ACÁDEMICO del estudiante ",
      40,
      300
    );
    doc.text(
      this.alumno.persona.primer_nombre +
        " " +
        this.alumno.persona.segundo_nombre +
        " " +
        this.alumno.persona.primer_apellido +
        " " +
        this.alumno.persona.segundo_apellido +
        " de las prácticas pre profesionales en la empresa",
      40,
      320
    );
    doc.text(
      this.validacionSac.convocatoria.solicitudEmpresa.empresa.nombre + ".",
      40,
      340
    );
    doc.text(
      "Agradezco de antemano su valiosa colaboración con esta importante actividad.",
      80,
      390
    );
    doc.text("Atentamente,", 40, 440);
    doc.text("______________________", 40, 500);
    doc.text("Responsable de Prácticas Pre Profesionales", 40, 520);
    doc.text(this.validacionSac.convocatoria.carrera.nombre, 40, 540);
    doc.text("INSTITUTO SUPERIOR TECNOLÓGICO DEL AZUAY", 40, 560);

    console.log(dataBody);
    autoTable(doc, {
      startY: 180,
      body: dataBody,
    });
    doc.save("ANEXO6.pdf");
  }
}
