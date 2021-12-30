import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Alumno } from 'src/app/models/alumno.model';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { SolicitudAlumno } from 'src/app/models/solicitudAlumno.model';
import { AlumnoService } from 'src/app/services/services.models/alumno.service';
import { ConvocatoriasService } from 'src/app/services/services.models/convocatorias.service';
import { SolicitudAlumnoService } from 'src/app/services/services.models/solicitudes-alumnos.service';
import Swal from 'sweetalert2';
import jsPDF, * as jspdf from 'jspdf';
import autoTable, { UserOptions } from 'jspdf-autotable';

interface jsPDFWithPlugin extends jspdf.jsPDF {
  [x: string]: any;

  autoTable: (optios: UserOptions) => jspdf.jsPDF;
}
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit, AfterViewInit {

  user: any;
  public alumno = new Observable<Alumno>();
  //VARIABLE DE LOADING
  public cargando: boolean = true;
  //VARIABLE PARA BUSCAR
  public busqueda: string = "";
  //VARIABLE DE FECHA
  today = new Date();
  jstoday = '';
  // Variable para almanecar localmente
  public asistenciaStorage: any[] = [];
  public convocatoria = new Convocatoria();

  constructor(
    private convocatoriaService: ConvocatoriasService,
    private activatedRoute: ActivatedRoute,
    private alumnoService: AlumnoService,
    private solicitudAlumnosrv: SolicitudAlumnoService,
    private router: Router
  ) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
  }

  ngAfterViewInit(): void {

  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("usuario"));
    this.alumno = this.alumnoService.getAlumnoByPersonaId(this.user.id);
    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarConvocatoria(id);
    }
    );

  }

  cargarConvocatoria(id: number) {
    if (!id) {
      return;
    }
    this.convocatoriaService
      .getConvocatoriaById(id)
      .subscribe(convocatoria => {
        this.convocatoria = convocatoria;

      });
  }

  ObtenerFecha() {
    let fechaEmision = new Date();
    let mes = fechaEmision.getMonth();
    let dia = fechaEmision.getDate();
    let messtr, diastr;

    if (messtr < 10) {
      messtr = "0" + mes;
    } else {
      messtr = "" + mes;
    }
    if (diastr < 10) {
      diastr = "0" + dia;
    } else {
      diastr = "" + dia;
    }
    return fechaEmision.getFullYear() + "-" + messtr + "-" + diastr;
  }

  solicitudAlumno = new SolicitudAlumno();

  llamarUsuario() {
    this.alumno.subscribe({
      next: (alumno: Alumno) => {
        this.solicitudAlumno.fecha_emision = this.ObtenerFecha();
        this.solicitudAlumno.numero_horas = 240;
        console.warn('segundo', this.solicitudAlumno);
        this.solicitudAlumno.convocatoria = this.convocatoria;
        console.log(this.ObtenerFecha());
        this.solicitudAlumno.alumno = alumno;
        console.warn(alumno);
      }
      , complete: () => {

        this.solicitudAlumnosrv.crear(this.solicitudAlumno).subscribe(data => {
          console.log(data);
          Swal.fire(
            "Solicitud Estudiante",
            `creada con exito!`,
            "success"
          );
          /*this.irListaSolicitudes();*/
          console.log("Solicitud Exitosa");

        },
          error => console.log("ha ocurrido un error")
        );
      }
    }
    );
  }

  async exportPdf() {

    const dataBody = [];
    const data = await this.asistenciaStorage;
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.setFontSize(14);
    doc.text('ANEXO 3: Solicitud Estudiantes ', 20, 80);
    doc.text(this.solicitudAlumno.fecha_emision, 490, 120);
    doc.text(this.solicitudAlumno.convocatoria.solicitudEmpresa.responsablePPP.docente.abreviatura_titulo, 40, 140);
    doc.text(this.solicitudAlumno.convocatoria.solicitudEmpresa.responsablePPP.docente.persona.primer_nombre, 40, 160);
    doc.text(this.solicitudAlumno.convocatoria.solicitudEmpresa.responsablePPP.docente.persona.primer_apellido, 140, 160);
    doc.text('RESPONSABLE DE PRÁCTICAS PRE PROFESIONALES DE LA CARRERA DE', 40, 180);
    doc.text(this.solicitudAlumno.convocatoria.carrera.nombre, 40, 200);
    doc.text('Su despacho: ', 40, 240);
    doc.text('De mi consideración: Por medio de la presente, Yo, ' + this.solicitudAlumno.alumno.persona.primer_nombre + '  ' +
      this.solicitudAlumno.alumno.persona.segundo_nombre + '  ' +
      this.solicitudAlumno.alumno.persona.primer_apellido + '  ', 40, 260);
    doc.text(this.solicitudAlumno.alumno.persona.segundo_apellido + '  '
      + ' con numero de cedula ' + this.solicitudAlumno.alumno.persona.identificacion
      + ' estudiante del ' + this.solicitudAlumno.alumno.ciclo +
      ' ciclo " ' + this.solicitudAlumno.alumno.paralelo + ' " ' +
      ' del periodo ', 40, 280);
    doc.text('académico Abril 2020 - Octubre 2020 de la carrera de ', 40, 300);
    doc.text(this.solicitudAlumno.convocatoria.carrera.nombre, 40, 320);
    doc.text(', solicito comedidamente se autorice mi postulación para realizar las 240 horas de  ', 40, 340);
    doc.text(' prácticas pre profesionales en la empresa ', 40, 360);
    doc.text(this.solicitudAlumno.convocatoria.solicitudEmpresa.empresa.nombre, 40, 380);
    doc.text(' segun solicitud CONVOCATORIA ' + this.solicitudAlumno.convocatoria.id, 40, 400);
    doc.text('Acepto realizar el proceso de selección determinado por la empresa receptora ', 40, 450);
    doc.text('y en caso de ser elegido, me comprometo a cumplir con la normativa de la empresa,', 40, 470);
    doc.text('presentar los requisitos solicitados por el Instituto Superior Tecnológico del', 40, 490);
    doc.text('Azuay como prueba de las actividades realizadas y demostrar profesionalismo,del', 40, 510);
    doc.text('dedicación y honestidad en todo momento, dejando en alto el nombre de la institución ', 40, 530);
    doc.text('educativa y colaborando en el fortalecimiento de la empresa receptora que me brinda ', 40, 550);
    doc.text('la posibilidad de formarme en sus instalaciones. ', 40, 570);
    doc.text('Sin más que informar, me despido agradeciendo de antemano su colaboración.', 40, 600);
    doc.text('Atentamente.', 40, 620);
    doc.text('______________________', 40, 670);
    doc.text('Nombre:' + this.solicitudAlumno.alumno.persona.primer_nombre + ' ' +
      this.solicitudAlumno.alumno.persona.segundo_nombre + ' ' +
      this.solicitudAlumno.alumno.persona.primer_apellido + ' ' +
      this.solicitudAlumno.alumno.persona.segundo_apellido, 40, 690);
    doc.text('Telefono: ' + this.solicitudAlumno.alumno.persona.celular, 40, 710);
    doc.text('Correo: ' + this.solicitudAlumno.alumno.persona.email, 40, 730);

    doc.setFontSize(10);

    console.log(dataBody);
    autoTable(doc, {
      startY: 180,
      // head: head,
      body: dataBody,
    });
    doc.save('ANEXO3.pdf');
  }

  irListaConvocatorias() {
    this.router.navigateByUrl('/dashboard/convocatoriasabiertas');
  }

  irListaSolicitudes() {
    this.router.navigateByUrl('/dashboard/solicitudes_estudiantes');
  }

}
