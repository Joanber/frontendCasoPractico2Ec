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
import autoTable, { UserOptions } from "jspdf-autotable";
import jsPDF, * as jspdf from 'jspdf';
interface jsPDFWithPlugin extends jspdf.jsPDF {
  [x: string]: any;

  autoTable: (optios: UserOptions) => jspdf.jsPDF;
}
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

  // Variable para almanecar localmente
  public asistenciaStorage: any[] = [];
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
      "yyyy-MM-dd"
    );
    this.acta.fecha_fin_ppp = fechaFormateadaFIn;
    this.acta.alumno = this.alumno;
    this.acta.actividadesActasDR = null;

    this.actaService.crear(this.acta).subscribe((acta) => {
      Swal.fire("Nueva Acta", `¡ Acta creada con exito!`, "success");
      this.respuestaEmpresas();
    });
  }
  respuestaEmpresas() {
    this.router.navigateByUrl("/dashboard/respuestas-empresas");
  }

  async exportPdf() {

    const dataBody = [];
    const data = await this.asistenciaStorage;
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.setFontSize(12);
    doc.text('ANEXO 7: ACTA DE REUNION ', 220, 100);
    doc.text('Fecha: '+this.acta.fecha_emision,40, 140);
    doc.text('Asistentes: ', 40, 150);
    //doc.text('-	Mgtr.'+this.validacionSac.convocatoria.solicitudEmpresa.responsablePPP.docente.persona.primer_nombre, 40,180);
    // +' '+this.validacionSac.convocatoria.solicitudEmpresa.responsablePPP.docente.persona.segundo_nombre
    // +' '+this.validacionSac.convocatoria.solicitudEmpresa.responsablePPP.docente.persona.primer_apellido
    // +' '+this.validacionSac.convocatoria.solicitudEmpresa.responsablePPP.docente.persona.primer_apellido+' ,Responsable de Prácticas Pre Profesionales', 40, 180);
    // doc.text('Su Despacho. -', 40, 210);
    // doc.text('De mi consideración: ', 40, 260);
    // doc.text('Luego de expresarle un atento saludo y desearle éxito en las funciones que acertadamente', 40, 280);
    // doc.text('realiza, me permito informarle ha sido designado como TUTOR ACÁDEMICO del estudiante ', 40, 300);
    // doc.text(this.designacionta.alumno.persona.primer_nombre+' '+this.designacionta.alumno.persona.segundo_nombre
    // +' '+this.designacionta.alumno.persona.primer_apellido+' '+this.designacionta.alumno.persona.segundo_apellido+' de las prácticas pre profesionales en la empresa', 40, 320);
    // doc.text(this.validacionSac.convocatoria.solicitudEmpresa.empresa.nombre+'.', 40, 340);
    // doc.text('Agradezco de antemano su valiosa colaboración con esta importante actividad.', 80, 390);
    // doc.text('Atentamente,', 40, 440);
    // doc.text('______________________', 40, 500);
    // doc.text('Responsable de Prácticas Pre Profesionales', 40, 520);
    // doc.text(this.validacionSac.convocatoria.carrera.nombre, 40, 540);
    // doc.text('INSTITUTO SUPERIOR TECNOLÓGICO DEL AZUAY', 40, 560);

    console.log(dataBody);
    autoTable(doc, {
      startY: 180,
      body: dataBody,
    });
    doc.save('ANEXO7.pdf');
  }
}
