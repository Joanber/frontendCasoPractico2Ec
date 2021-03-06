import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import autoTable, { UserOptions } from "jspdf-autotable";
import { Alumno } from "src/app/models/alumno.model";
import { Convocatoria } from "src/app/models/convocatoria.model";
import { SolicitudAlumno } from "src/app/models/solicitudAlumno.model";
import { SolicitudEmpresa } from "src/app/models/solicitudEmpresa.model";
import { ValidacionSAC } from "src/app/models/validaciones_sac.model";
import { ConvocatoriasService } from "src/app/services/services.models/convocatorias.service";
import { SolicitudAlumnoService } from "src/app/services/services.models/solicitudes-alumnos.service";
import { ValidacionesSacService } from "src/app/services/services.models/validaciones-sac.service";
import Swal from "sweetalert2";
import jsPDF, * as jspdf from "jspdf";
import { ThrowStmt } from "@angular/compiler";

interface jsPDFWithPlugin extends jspdf.jsPDF {
  [x: string]: any;

  autoTable: (optios: UserOptions) => jspdf.jsPDF;
}

@Component({
  selector: "app-add-validacion-seleccion",
  templateUrl: "./add-validacion-seleccion.component.html",
  styleUrls: ["./add-validacion-seleccion.component.css"],
})
export class AddValidacionSeleccionComponent implements OnInit {
  public solicitudEmpresa = new SolicitudEmpresa();
  public validacionSAC = new ValidacionSAC();
  public convocatoria = new Convocatoria();
  public alumnos = new Alumno();

  public formSubmitted = false;

  //VARIABLE DE PERSONAS
  public solicitudesAlumnos: SolicitudAlumno[] = [];
  public alumnosXconvocatoria: SolicitudAlumno[] = [];
  public validacionesSac: ValidacionSAC[] = [];
  //variable para guardar los alumnos seleccionados

  listaAlumnos: Alumno[] = [];

  //Variable fecha
  today = new Date();
  jstoday = "";
  // Variable para almanecar localmente
  public asistenciaStorage: any[] = [];

  constructor(
    private validacionesSacService: ValidacionesSacService,
    private convocatoriaService: ConvocatoriasService,
    private solicitudAlumnosService: SolicitudAlumnoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) =>
      this.cargarConvocatoria(id)
    );
    this.activatedRoute.params.subscribe(({ idc }) =>
    this.cargarValidacionById(idc)
  );
    this.getSolicitudesAlumnos();
  }

  cargarConvocatoria(id: number) {
    if (!id) {
      return;
    }
    this.convocatoriaService
      .getConvocatoriaById(id)
      .subscribe((convocatoria) => {
        this.convocatoria = convocatoria;
      });
  }

  cargarValidacionById(idc){
    if (!idc) {
      return;
    }
    this.validacionesSacService
      .getValidacionSacById(idc)
      .subscribe((val) => {
        if (!val) {
          return this.irListarespuestaEmpresas();
        }

        this.validacionSAC = val;
        this.convocatoria = this.validacionSAC.convocatoria;
      });
  }


  getSolicitudesAlumnos() {
    this.solicitudAlumnosService
      .getSolicitudesAlumnos()
      .subscribe((solicitudes) => {
        this.solicitudesAlumnos = solicitudes;
        for (let i = 0; i < this.solicitudesAlumnos.length; i++) {
          if (
            this.convocatoria.id === this.solicitudesAlumnos[i].convocatoria.id
          ) {
            this.alumnosXconvocatoria.push(this.solicitudesAlumnos[i]);
          }
        }
      });
  }

  guardarSeleccionEstudiantes(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    if (this.validacionSAC.id) {
      this.validacionSAC.convocatoria = this.convocatoria;
      this.validacionSAC.alumnos = this.listaAlumnos;
      this.validacionesSacService
        .editar(this.validacionSAC, this.validacionSAC.id)
        .subscribe((validacion) => {
          Swal.fire(
            "Actualizar Respuesta a empresa",
            `??actualizada con exito!`,
            "success"
          );
          this.irListarespuestaEmpresas();
        });
    } else {
      if (this.convocatoria.id) {
        this.validacionSAC.convocatoria = this.convocatoria;

        this.validacionSAC.alumnos = this.listaAlumnos;

        this.validacionesSacService
          .crear(this.validacionSAC)
          .subscribe((validacion) => {
            Swal.fire(
              "Nueva Respuesta a empresa",
              `?? Respuesta a empresa  creada con exito!`,
              "success"
            );
            this.irListarespuestaEmpresas();
          });
      }
    }
  }

  irListarespuestaEmpresas() {
    this.router.navigateByUrl("/dashboard/respuestas-empresas");
  }
  irConvocatorias() {
    this.router.navigateByUrl("/dashboard/convocatorias");
  }
  alumnosSeleccionados(e: any, id: string) {
    var ide = parseInt(id);
    if (e.target.checked) {
      for (let i = 0; i < this.alumnosXconvocatoria.length; i++) {
        if (this.alumnosXconvocatoria[i].alumno.id === ide) {
          this.listaAlumnos.push(this.alumnosXconvocatoria[i].alumno);
        }
      }
    } else {
      for (let i = 0; i < this.alumnosXconvocatoria.length; i++) {
        if (this.alumnosXconvocatoria[i].alumno.id === ide) {
          this.listaAlumnos.splice(i, 1);
          return;
        }
      }
    }
  }
  async exportPdf() {
    const dataBody = [];
    const data = await this.asistenciaStorage;
    const head = [["Cedula", "Estudiante"]];
    const doc = new jsPDF("p", "pt", "a4");
    doc.setFontSize(12);

    doc.text("ANEXO 4: Respuesta positiva a entidad receptora ", 20, 80);
    //doc.text(this.solicitudEmpresa.fecha_emision,490,120); PENDIENTE SACAR FECHA
    doc.text(
      this.convocatoria.solicitudEmpresa.empresa.empresaPersonal.persona
        .primer_nombre +
        " " +
        this.convocatoria.solicitudEmpresa.empresa.empresaPersonal.persona
          .segundo_nombre +
        " " +
        this.convocatoria.solicitudEmpresa.empresa.empresaPersonal.persona
          .primer_apellido +
        " " +
        this.convocatoria.solicitudEmpresa.empresa.empresaPersonal.persona
          .segundo_apellido,
      40,
      150
    );
    doc.text(
      this.convocatoria.solicitudEmpresa.empresa.empresaPersonal.cargo,
      40,
      170
    );
    doc.text(this.convocatoria.solicitudEmpresa.empresa.nombre, 40, 190);
    doc.text("Su Despacho.- ", 40, 210);
    doc.text("De mi consideraci??n:", 40, 260);
    doc.text(
      "En respuesta a su solicitud de fecha " +
        this.convocatoria.solicitudEmpresa.fecha_emision +
        " debo indicarle que luego haber",
      40,
      310
    );
    doc.text(
      "realizado el proceso de selecci??n entre los estudiantes postulantes se ha aceptado",
      40,
      330
    );
    doc.text(
      "la solicitud de los siguientes estudiantes que est??n interesados en realizar sus",
      40,
      350
    );
    doc.text("pr??cticas pre profesionales en su prestigiosa empresa:", 40, 370);

    for (let i = 0; i < this.listaAlumnos.length; i++) {
      const valor_imprimir = (this.listaAlumnos[i].persona.identificacion+'                          '+this.listaAlumnos[i].persona.primer_nombre+' '+this.listaAlumnos[i].persona.segundo_nombre
      +' '+this.listaAlumnos[i].persona.primer_apellido+' '+this.listaAlumnos[i].persona.segundo_apellido);
      doc.text(valor_imprimir,40,430+i*15); 
  }
    doc.text(
      "Solicito de la manera m??s comedida realizar la designaci??n del tutor empresarial",
      40,
      500
    );
    doc.text(
      "para cada uno de los estudiantes, el mismo que ser?? quien oriente al estudiante",
      40,
      520
    );
    doc.text(
      "dentro de la empresa durante el tiempo que realice las pr??cticas pre profesionales.",
      40,
      540
    );
    doc.text(
      "Sin m??s que informar me despido agradeciendo de antemano su colaboraci??n.",
      40,
      590
    );
    doc.text("Atentamente,", 40, 640);
    doc.text("______________________", 40, 690);
    doc.text("Responsable de Pr??cticas Pre Profesionales", 40, 710);
    doc.text("CARRERA DE ", 40, 730);
    doc.text(this.convocatoria.carrera.nombre, 40, 750);
    doc.text("INSTITUTO SUPERIOR TECNOL??GICO DEL AZUAY", 40, 770);
  

    console.log(dataBody);
    autoTable(doc, {
      startY: 390,
      head: head,
      body: dataBody,
    });
    doc.save("ANEXO4.pdf");
  }
}
