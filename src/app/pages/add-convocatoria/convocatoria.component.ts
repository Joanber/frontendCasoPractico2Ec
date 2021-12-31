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
  public asistenciaStorage: any[] = [];

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


  async exportPdf() {

    const dataBody = [];
    const data = await this.asistenciaStorage;
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.setFontSize(12);
    doc.text('ANEXO 2: Convocatoria a prácticas pre profesionales ', 20, 80);
    doc.text(this.solicitudEmpresa.fecha_emision, 490, 120);
    doc.text('CONVOCATORIA-' + this.solicitudEmpresa.responsablePPP.carrera.abreviatura + '-2021', 390, 140);
    doc.text('A los estudiantes Interesados: ', 40, 200);
    doc.text('Se convoca a los estudiantes de ' + this.convocatoria.ciclo + ' ciclo de la carrera ', 40, 300);
    doc.text(this.solicitudEmpresa.responsablePPP.carrera.nombre, 40, 320);
    doc.text('que deseen realizar sus prácticas pre profesionales en la empresa ', 40, 340);
    doc.text(this.solicitudEmpresa.empresa.nombre, 40, 360);
    doc.text('a presentar la solicitud correspondiente.', 40, 380);
    doc.text('Las actividades a desarrollar son: ', 40, 400);
    doc.text(this.convocatoria.actividades, 40, 420);
    doc.text('por lo que los postulantes deberán haber aprobado las siguientes asignaturas:', 40, 440);
    doc.text(this.convocatoria.asignaturas, 40, 460);
    doc.text('La fecha máxima en la que se receptarán las solicitudes es el ' + this.convocatoria.fecha_max_recib_solic, 40, 480);
    doc.text('Para mayor información contactarse con ' + this.solicitudEmpresa.responsablePPP.docente.persona.primer_nombre + ' ' + this.solicitudEmpresa.responsablePPP.docente.persona.primer_apellido, 40, 500);
    doc.text('docente responsable de prácticas pre profesionales de la carrera.', 40, 520);
    doc.text('______________________', 40, 590);
    doc.text('Responsable de Prácticas Pre Profesionales', 40, 610);
    doc.text('CARRERA DE ', 40, 630);
    doc.text('Atentamente,', 40, 650);
    doc.text(this.solicitudEmpresa.responsablePPP.carrera.nombre, 40, 670);
    doc.text('INSTITUTO SUPERIOR TECNOLÓGICO DEL AZUAY', 40, 690);

    console.log(dataBody);
    autoTable(doc, {
      startY: 180,
      body: dataBody,
    });
    doc.save('ANEXO2.pdf');
  }
}
