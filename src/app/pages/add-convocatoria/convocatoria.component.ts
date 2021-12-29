import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import autoTable, { UserOptions } from 'jspdf-autotable';
import { formatDate } from '@angular/common';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { ConvocatoriasService } from 'src/app/services/services.models/convocatorias.service';
import Swal from 'sweetalert2';
import { SolicitudEmpresa } from 'src/app/models/solicitudEmpresa.model';
import { SolicitudEmpresaService } from 'src/app/services/services.models/solicitud-empresa.service';
import jsPDF, * as jspdf from 'jspdf';
import { style } from '@angular/animations';
import { ThrowStmt } from '@angular/compiler';


interface jsPDFWithPlugin extends jspdf.jsPDF {
  [x: string]: any;

  autoTable: (optios: UserOptions) => jspdf.jsPDF;
}



@Component({
  selector: 'app-convocatoria',
  templateUrl: './convocatoria.component.html',
  styleUrls: ['./convocatoria.component.css'],
  providers: [DatePipe],
})
export class ConvocatoriaComponent implements OnInit {
  public solicitudEmpresa = new SolicitudEmpresa();
  public convocatoria = new Convocatoria();
  public formSubmitted = false;

  ultimoElemento = 1;
  // Variable fecha
  today = new Date();
  jstoday = '';
  // Variable para almanecar localmente
  public asistenciaStorage: any [] = [];

  constructor(
    private solicitudEmpresaService: SolicitudEmpresaService,
    private convocatoriaService: ConvocatoriasService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private miDatePipe: DatePipe
  ) {
    this.jstoday = formatDate(
      this.today,
      'dd-MM-yyyy hh:mm:ss a',
      'en-US',
      '+0530'
    );
  }



  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) =>
      this.cargarSolicitudEmpresa(id)
    );
    this.activatedRoute.params.subscribe(({ idc }) =>
      this.cargarConvocatoriaById(idc)
    );


  }


  guardarConvocatoria(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    if (this.convocatoria.id) {
      const fechaFormateadaMax_recib = this.miDatePipe.transform(
        this.convocatoria.fecha_max_recib_solic,
        'yyyy-MM-dd'
      );
      this.convocatoria.fecha_max_recib_solic = fechaFormateadaMax_recib;
      this.convocatoria.solicitudEmpresa = this.solicitudEmpresa;
      this.convocatoria.carrera = this.solicitudEmpresa.responsablePPP.carrera;
      this.convocatoria.estado = true;
      this.convocatoriaService
        .editar(this.convocatoria, this.convocatoria.id)
        .subscribe((convocatoria) => {
          Swal.fire(
            'Actualizar Convocatoria',
            `¡${convocatoria.id} actualizada con exito!`,
            'success'
          );
          this.irListaConvocatorias();
        });
    } else {
      if (this.solicitudEmpresa.id) {
        const fechaFormateadaMax_recib = this.miDatePipe.transform(
          this.convocatoria.fecha_max_recib_solic,
          'yyyy-MM-dd'
        );
        this.convocatoria.fecha_max_recib_solic = fechaFormateadaMax_recib;
        this.convocatoria.solicitudEmpresa = this.solicitudEmpresa;
        this.convocatoria.carrera = this.solicitudEmpresa.responsablePPP.carrera;
        this.convocatoria.estado = true;
        this.convocatoriaService
          .crear(this.convocatoria)
          .subscribe((convocatoria) => {
            Swal.fire(
              'Nueva Convocatoria',
              `¡ Convocatoria creada con exito!`,
              'success'
            );
            this.irListaConvocatorias();
          });
      }
    }
  }

  cargarSolicitudEmpresa(id: number) {
    if (!id) {
      return;
    }
    this.solicitudEmpresaService
      .getSolicitudEmpresaById(id)
      .subscribe((solicitudEmpresa) => {
        if (!solicitudEmpresa) {
          return this.irListaConvocatorias();
        }
        this.solicitudEmpresa = solicitudEmpresa;
      });
  }
  cargarConvocatoriaById(idc: number) {
    if (!idc) {
      return;
    }
    this.convocatoriaService
      .getConvocatoriaById(idc)
      .subscribe((convocatoria) => {
        if (!convocatoria) {
          return this.irListaConvocatorias();
        }
        this.solicitudEmpresa = convocatoria.solicitudEmpresa;
        this.convocatoria = convocatoria;
      });
  }

  irListaConvocatorias() {
    this.router.navigateByUrl('/dashboard/convocatorias');
  }
  irListaSolicitudes() {
    this.router.navigateByUrl('/dashboard/solicitudes_empresas');
  }

  // exportPdfEmp() {
  //   const doc = new jsPDF()
  //   var contenido = '';
  //   contenido += '              INSTITUTO SUPERIOR TECNOLOGICO DEL AZUAY'
  //   contenido += '\n                                         Reporte de la empresa'
  //   autoTable(doc.text(contenido, 5, 5), { html: '#todo-Cuerpo' })
  //   doc.save('Anexo-2.pdf')
  // }

  async exportPdf() {
    const dataBody = [];
    const data = await this.asistenciaStorage;
    // const head = [['No', 'Fecha','Hora llegada', 'Hora salida', 'Actividad realizada', 'Firma tutor', 'Numero horas']];
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.setFontSize(14);
    doc.text('ANEXO 2: Convocatoria a prácticas pre profesionales ', 20, 40);
    doc.text('INSTITUTO SUPERIOR TECNOLÓGICO DEL AZUAY', 20, 100);
    doc.text('A los estudiantes Interesados: ', 20, 120);
    doc.text('Se convoca a los estudiantes de '+this.convocatoria.ciclo, 20, 140);
    doc.text('ciclo de la carrera '+this.solicitudEmpresa.responsablePPP.carrera.nombre,20, 160);
    doc.text('que deseen realizar sus prácticas pre profesionales en la empresa '+this.solicitudEmpresa.empresa.nombre,20, 180);
    doc.text('a presentar la solicitud correspondiente.',20, 200);
    doc.text('Las actividades a desarrollar son: '+this.convocatoria.actividades,20,220);
    doc.text('por lo que los postulantes deberán haber aprobado las siguientes asignaturas:'+this.convocatoria.asignaturas,20,260);
    doc.text('La fecha máxima en la que se receptarán las solicitudes es el '+this.convocatoria.fecha_max_recib_solic,20,280);
    doc.text('Para mayor información contactarse con '+this.solicitudEmpresa.responsablePPP.docente.persona.primer_nombre+this.solicitudEmpresa.responsablePPP.docente.persona.primer_apellido,20,300);
    
    doc.setFontSize(10);
    //  doc.text("Estudiante: "+data[0].estudiante.persona.primernombre + ' ' +data[0].estudiante.persona.primerapellido,
    //    10,110);
    // doc.text("Empresa: "+ data[0].tutorEmpresarial.empresa.nombreempresa ,10,130);
    // doc.text("Tutor empresarial: "+ data[0].tutorEmpresarial.nombretutor ,10,150);
    // doc.text("Horas cumplidas: " +this.totalH.toString()+" horas" , 10,170);
    // data.forEach( data => {
    //   let row = [
    //     data.idasistencia,
    //     this.formatoFecha(data.fechaActual),
    //     this.formatoHora(data.horaInicio),
    //     this.formatoHora(data.horaFin),
    //     data.actividadRealizada,
    //     '',
    //     data.numeroHoras,
    //   ];
    //   dataBody.push(row);
    // });
    console.log(dataBody);
    autoTable(doc, {
      startY: 180,
      // head: head,
      body: dataBody,
    });
    doc.save('ANEXO2.pdf');
  }
}
