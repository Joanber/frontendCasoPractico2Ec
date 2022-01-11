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
import jsPDF, * as jspdf from "jspdf";
import { SolicitudAlumno } from "src/app/models/solicitudAlumno.model";
import { SolicitudAlumnoService } from "src/app/services/services.models/solicitudes-alumnos.service";
import { ActividadesActasDR } from "src/app/models/actividadesActasDR.model";
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
  public solicitudAlumno = new SolicitudAlumno();
  public actiActa = new ActividadesActasDR();
  public alumno = new Alumno();
  public acta = new ActaDR();
  public formSubmitted = false;
  public newAttribute: any = {};
  public identificacion: string = "";
  public nombres: string = "";

  today = new Date();
  jstoday = "";

  // Variable para almanecar localmente
  public asistenciaStorage: any[] = [];

  public actividadesActa: ActividadesActasDR[] = [];
  newDynamic: any = {};

  constructor(
    private validacionesSacService: ValidacionesSacService,
    private designacionTAService: DesignacionTaService,
    private designacionTeService: DesignacionTEService,
    private actaService: ActaService,
    private alumnoService: AlumnoService,
    private solicitudAlumnoService: SolicitudAlumnoService,
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
    this.activatedRoute.params.subscribe(({ ida }) =>
      this.SolicitudAlumno(ida)
    );
  }
  addFieldValue() {
    this.actividadesActa.push(this.newAttribute);
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.actividadesActa.splice(index, 1);
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
    this.solicitudAlumnoService.getSolicitudAlumnoById(ida).subscribe((SA) => {
      this.solicitudAlumno = SA;
    });
  }
  private SolicitudAlumno(ida: number) {
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
    const fechaFormateadaIni = this.miDatePipe.transform(
      this.acta.fecha_fin_ppp,
      "yyyy-MM-dd"
    );
    const fechaFormateadaFIn = this.miDatePipe.transform(
      this.acta.fecha_fin_ppp,
      "yyyy-MM-dd"
    );
    this.acta.fecha_inicio_ppp = fechaFormateadaIni;
    this.acta.fecha_fin_ppp = fechaFormateadaFIn;
    this.acta.alumno = this.alumno;

    this.acta.actividadesActasDR = this.actividadesActa;

    this.actaService.crear(this.acta).subscribe((acta) => {
      Swal.fire("Nueva Acta", `¡ Acta creada con exito!`, "success");
   //   this.irListarActas();
    });
  }
  irListarActas() {
    this.router.navigateByUrl("/dashboard/list-actas");
  }

  async exportPdf() {
    const dataBody = [];
    const head = [["Area", "Actividad por realizar","Asignaturas relacionadas"]];
    const data = await this.asistenciaStorage;
    const doc = new jsPDF("p", "pt", "a4");
    doc.setFontSize(12);
    doc.text("ANEXO 7: ACTA DE REUNION ", 220, 100);
    //doc.text("Fecha: " + this.acta.fecha_emision, 40, 140);
    doc.text("Asistentes: ", 40, 150);
    doc.text(this.validacionSac.convocatoria.carrera.docente.abreviatura_titulo+''+this.validacionSac.convocatoria.solicitudEmpresa.responsablePPP
    .docente.persona.primer_nombre+
    this.validacionSac.convocatoria.solicitudEmpresa.responsablePPP
    .docente.persona.segundo_nombre+
    this.validacionSac.convocatoria.solicitudEmpresa.responsablePPP
    .docente.persona.primer_apellido+
    this.validacionSac.convocatoria.solicitudEmpresa.responsablePPP
    .docente.persona.segundo_apellido+' Responsable de Prácticas Pre Profesionales ',40,170);
  
    doc.text('de la carrera de: '+this.validacionSac.convocatoria.solicitudEmpresa.responsablePPP.carrera.nombre, 40, 190);
    doc.text('del Instituto Superior Tecnológico del Azuay.',40,210);
    doc.text(this.designacionte.empresaPersonal.persona.primer_nombre+' '+this.designacionte.empresaPersonal.persona.segundo_nombre+
    ' '+ this.designacionte.empresaPersonal.persona.primer_apellido+' '+this.designacionte.empresaPersonal.persona.segundo_apellido +' Tutor asignado ',40,230);
    doc.text('por la empresa: '+this.validacionSac.convocatoria.solicitudEmpresa.empresa.nombre,40,250 );
    doc.text('Asunto: Actividades a desarrollar en las prácticas pre profesionales por el estudiante :',40, 270);
    doc.text(this.alumno.persona.primer_nombre+' '+this.alumno.persona.segundo_nombre+' '+ this.alumno.persona.primer_apellido+' '+ this.alumno.persona.segundo_apellido,40,290);
    doc.text("Desarrollos y acuerdos ", 220, 330);
    doc.text('-	Planificación de actividades a desarrollar: ', 60, 360);
    doc.text('Con base en la solicitud realizada por la empresa '+this.validacionSac.convocatoria.solicitudEmpresa.empresa.nombre, 40, 380);
    doc.text('el/la Sr./Srta./Sra. '+this.alumno.persona.primer_nombre+' '+this.alumno.persona.segundo_nombre+' '+ this.alumno.persona.primer_apellido+' '+ this.alumno.persona.segundo_apellido, 40,400);
    doc.text('estudiante de '+this.alumno.ciclo +' ciclo de la carrera '+this.validacionSac.convocatoria.solicitudEmpresa.responsablePPP.carrera.nombre,40,420);
    doc.text('del Instituto Superior Tecnológico del Azuay llevará a cabo las siguientes actividades',40,440);
    doc.text('para la cumplir con las '+this.solicitudAlumno.numero_horas+'horas de prácticas pre profesionales.',40,460);
    for (let i = 0; i < this.actividadesActa.length; i++) {
      const valor_imprimir = (this.actividadesActa[i].area+'         '+this.actividadesActa[i].actividad+'                                '+this.actividadesActa[i].asignatura);
      doc.text(valor_imprimir,40,530+i*15); 
  }

    doc.text('- 	Fechas Importantes y horario de prácticas pre profesionales', 60, 600);
    doc.text('El estudiante comenzará a desarrollar las prácticas pre profesionales a partir del '+this.acta.fecha_inicio_ppp, 40, 620);
    doc.text('y terminará el '+this.acta.fecha_fin_ppp+' en un horario de '+this.acta.desde+ ' a '+this.acta.hasta,40,640);

    doc.text('-	Acuerdos varios', 60, 680);
    doc.text('_________________________________________________________________________',40,710);
    doc.text('_________________________________________________________________________',40,730);




    doc.text('________________',40,770);
    doc.text(this.validacionSac.convocatoria.carrera.docente.abreviatura_titulo+' '+this.validacionSac.convocatoria.solicitudEmpresa
    .responsablePPP.docente.persona.primer_nombre+' '+this.validacionSac.convocatoria.solicitudEmpresa
    .responsablePPP.docente.persona.segundo_nombre+' '+this. validacionSac.convocatoria.solicitudEmpresa
    .responsablePPP.docente.persona.primer_apellido+' '+this.validacionSac.convocatoria.solicitudEmpresa
    .responsablePPP.docente.persona.primer_apellido, 40,785);
    doc.text('Responsable de practicas pre profesionales',40,800);

    doc.text('________________',310,770);
    doc.text(this.designacionte.empresaPersonal.persona.primer_nombre+' '+this.designacionte.empresaPersonal.persona.segundo_nombre+
    ' '+ this.designacionte.empresaPersonal.persona.primer_apellido+' '+this.designacionte.empresaPersonal.persona.segundo_apellido, 310, 785);
    doc.text('Tutor empresarial',310,800);

    console.log(dataBody);
    autoTable(doc, {
      startY: 480,
      head: head,
      body: dataBody,
    });
    doc.save("ANEXO7.pdf");
  }
}
