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
import jsPDF, * as jspdf from 'jspdf';
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
  public validacionesSac: ValidacionSAC [] = [];
  //variable para guardar los alumnos seleccionados
  alumnosSelect: any;
  //Variable fecha
  today = new Date();
  jstoday = "";
  // Variable para almanecar localmente
  public asistenciaStorage: any [] = [];

  constructor(
    private validacionesSacService: ValidacionesSacService,
    private convocatoriaService: ConvocatoriasService,
    private solicitudAlumnosService: SolicitudAlumnoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) =>
      this.cargarConvocatoria(id)
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
      for (let i = 0; i < this.alumnosXconvocatoria.length; i++) {
        this.validacionSAC.alumnos.push(this.alumnosXconvocatoria[i].alumno);
      }
      this.validacionesSacService
        .editar(this.validacionSAC, this.validacionSAC.id)
        .subscribe((validacion) => {
          Swal.fire(
            "Actualizar Respuesta a empresa",
            `¡${validacion.convocatoria.solicitudEmpresa.empresa.nombre} actualizada con exito!`,
            "success"
          );
          this.irListarespuestaEmpresas();
        });
    } else {
      if (this.convocatoria.id) {
        this.validacionSAC.convocatoria = this.convocatoria;
        for (let i = 0; i < this.alumnosXconvocatoria.length; i++) {
          this.validacionSAC.alumnos.push(this.alumnosXconvocatoria[i].alumno);
        }
        this.validacionesSacService
          .crear(this.validacionSAC)
          .subscribe((validacion) => {
            Swal.fire(
              "Nueva Respuesta a empresa",
              `¡ Respuesta a empresa ${validacion.convocatoria.solicitudEmpresa.empresa.nombre} creada con exito!`,
              "success"
            );
            this.irListarespuestaEmpresas();
          });
      }
    }
  }

  irListarespuestaEmpresas() {}
  irConvocatorias() {
    this.router.navigateByUrl("/dashboard/convocatorias");
  }

  async exportPdf() {

    const dataBody = [];
    const data = await this.asistenciaStorage;
    const head = [['Cedula', 'Estudiante']];
    const doc = new jsPDF('p', 'pt', 'a4');  
    //var logo = new Image();
    doc.setFontSize(14);
    // logo.src = 'src\assets\images\ista2.jpg';
    // doc.addImage(logo, 'JPEG', 20, 10, 50, 70);
    //doc.text('LOGO', 540, 15);
    doc.text('ANEXO 4: Respuesta positiva a entidad receptora ', 20, 80);
    //doc.text(this.solicitudEmpresa.fecha_emision,490,120); PENDIENTE SACAR FECHA
    doc.text(this.convocatoria.solicitudEmpresa.empresa.empresaPersonal.persona.primer_nombre+' '+this.convocatoria.solicitudEmpresa.empresa.empresaPersonal.persona.segundo_nombre
    +' '+this.convocatoria.solicitudEmpresa.empresa.empresaPersonal.persona.primer_apellido+' '+this.convocatoria.solicitudEmpresa.empresa.empresaPersonal.persona.segundo_apellido, 40, 150);
    doc.text(this.convocatoria.solicitudEmpresa.empresa.empresaPersonal.cargo,40, 170);
    doc.text(this.convocatoria.solicitudEmpresa.empresa.nombre,40, 190);
    doc.text('Su Despacho.- ',40, 210);
    doc.text('De mi consideración:',40,260);
    doc.text('En respuesta a su solicitud de fecha '+this.convocatoria.solicitudEmpresa.fecha_emision+' debo indicarle que luego haber',40, 310);
    doc.text('realizado el proceso de selección entre los estudiantes postulantes se ha aceptado',40,330);
    doc.text('la solicitud de los siguientes estudiantes que están interesados en realizar sus',40,350);
    doc.text('prácticas pre profesionales en su prestigiosa empresa:',40,370);
    doc.text('Solicito de la manera más comedida realizar la designación del tutor empresarial',40,500);
    doc.text('para cada uno de los estudiantes, el mismo que será quien oriente al estudiante',40,520);
    doc.text('dentro de la empresa durante el tiempo que realice las prácticas pre profesionales.',40,540);
    doc.text('Sin más que informar me despido agradeciendo de antemano su colaboración.',40,590);
    doc.text('Atentamente,',40,640);
    doc.text('______________________',40,690);
    doc.text('Responsable de Prácticas Pre Profesionales',40,710);
    doc.text('CARRERA DE ',40,730);
    doc.text(this.convocatoria.carrera.nombre,40,750)
    doc.text('INSTITUTO SUPERIOR TECNOLÓGICO DEL AZUAY',40,770);
     data.forEach( data => {
       let row = [
          //  data.solicitudesAlumnos.alumno.persona.identificacion,
          //  data.solicitudesAlumnos.alumno.persona.primer_nombre,
          //  (data.identificacion)
    //     this.formatoFecha(data.fechaActual),
    //     this.formatoHora(data.horaInicio),
    //     this.formatoHora(data.horaFin),
    //     data.actividadRealizada,
    //     '',
    //     data.numeroHoras,
       ];
       dataBody.push(row);
    });
    doc.setFontSize(10);
    console.log(dataBody);
    autoTable(doc, {
      startY: 390,
      head: head,
      body: dataBody,
    });
    doc.save('ANEXO4.pdf');
  }
}
