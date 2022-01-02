import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButton, MatDialog, MatDialogRef, MatPaginator, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import { jsPDF } from 'jspdf';
import { Alumno } from 'src/app/models/alumno.model';
import { Carrera } from 'src/app/models/carrera.model';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { Persona } from 'src/app/models/persona.model';
import { SolicitudEmpresa } from 'src/app/models/solicitudEmpresa.model';
import { ValidacionSAC } from 'src/app/models/validaciones_sac.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { ValidacionesSacService } from 'src/app/services/services.models/validaciones-sac.service';
import Swal from 'sweetalert2';
export interface Componente {
  simbol: string;
  data: any;
}
@Component({
  selector: 'app-acreditacion-ppp',
  templateUrl: './acreditacion-ppp.component.html',
  styleUrls: ['./acreditacion-ppp.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AcreditacionPppComponent implements OnInit {
  constructor(public dialog: MatDialog, private validacionesSacService: ValidacionesSacService,
    private carreraService: CarreraService) {}

  get bodyCertificado(): string {
    const estudiante = this.alumno.persona.primer_apellido + ' ' +
      + ' ' + this.alumno.persona.segundo_apellido + ' ' + this.alumno.persona.primer_nombre + ' ' + this.alumno.persona.segundo_nombre;
    const cedula = this.alumno.persona.identificacion;
    const carrera = this.convocatoria.carrera.nombre;
    // tslint:disable-next-line: max-line-length
    const body = `Una vez revisada la documentación entregada por el estudiante <strong>${ estudiante }</strong>, portadora de la cédula de ciudadanía número <strong>${ cedula }</strong>, de la carrera de <strong>${ carrera }</strong> del Instituto Superior Tecnológico del Azuay ha cumplido con todos los requisitos establecidos en la ley para acreditar <strong>SATISFACTORIAMENTE</strong> las <strong>400 horas</strong> de prácticas pre profesionales, las cuales fueron desarrolladas cumpliendo con los dos componentes dispuestos en el Artículo 53 del Reglamento de Régimen Académico y en el proyecto de la carrera correspondiente:`;
    // this.cert.nativeElement.innerHTML = body;
    return body;
  }

  get NombreCoordinador(): string {
    const nombre = this.cordinador.primer_nombre + ' ' + this.cordinador.primer_apellido;
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLocaleLowerCase();
  }
  displayedColumns: string[] = ['identificacion'];
  initColumns: any[] = [
    {
      atribute: 'fecha_emision',
      name: 'Fecha de emisión'
    }
    ,
    {
      atribute: 'convocatoria',
      name: 'Ciclo'
    },
    {
      atribute: 'convocatoria',
      name: 'Ciclo'
    }
  ];
  columnsToDisplay: any[] = this.initColumns.map(col => col.atribute);

  expandedvalidacionSac: ValidacionSAC | null;
  // @ViewChild('cert', null) cert: ElementRef;
  @ViewChild(MatButton, null) button: MatButton;
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;

  public solicitudesEmpresas: SolicitudEmpresa[] = [];
  public pageSizeOptions: number[] = [5, 10, 20, 50];
  public validacionesSac: ValidacionSAC[] = [];
  public alumno = new Alumno();
  public convocatoria = new Convocatoria();
  public carreraFiltro: string = undefined;
  public carreras: Carrera[] = [];
  public totalRegistros = 0;
  public totalPorPagina = 5;
  public paginaActual = 0;

  cordinador: Persona;
  date = new Date();
  today: string;

  componentes: Componente[] = [
    {
      simbol: `-`,
      data: ` 240 horas de prácticas laborales,
      de naturaleza profesional en contextos reales de aplicación.`,
    },
    {
      simbol: `-`,
      data: ` 160 horas de Prácticas de servicio comunitario, cuya naturaleza es la atención a personas,
      grupos o contextos de vulnerabilidad.`,
    }
  ];

  public defaultCarrera: string = undefined;

  ngOnInit() {
    this.cordinador = JSON.parse(localStorage.getItem('usuario')).persona;
    this.load();
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    this.today = this.date.toLocaleDateString(undefined, options);
  }

  openDialog(alumno: any, convocatoria: Convocatoria): void {
    this.alumno = alumno;
    this.convocatoria = convocatoria;

    const dialogRef = this.dialog.open(DialogAcreditacionComponent, {
      data: {
        date: this.date, today: this.today, componentes: this.componentes,
        bodyCertificado: this.bodyCertificado,
        coordinador: this.NombreCoordinador,
        adicional: { abreviatura: this.convocatoria.carrera.abreviatura, convocatoria_id: convocatoria.id }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(`Dialog result: ${ result }`);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1400,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
        Toast.fire({
          icon: 'info',
          title: `Generando Acreditacion`,
        });
        this.exportPdf();
      }
    });
  }

  changeStatus(carrera: any) {

    this.carreraFiltro = carrera || '';
    if (this.carreraFiltro !== undefined) {
      this.getValidacionesSacPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        this.carreraFiltro
      );
    }
  }

  // obtine lista de estudiantes asignados para poder relaizar acreditacion

  load() {
    this.cargarCarreras();
    this.getValidacionesSacPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.carreraFiltro
    );
  }

  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getValidacionesSacPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.carreraFiltro
    );
  }

  private getValidacionesSacPage(
    page: string,
    size: string,
    carreraFiltro: string
  ) {
    this.validacionesSacService
      .getValidacionesSACPage(page, size, carreraFiltro)
      .subscribe((p) => {
        if (p.content.length === 0 && this.carreraFiltro) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });
          Toast.fire({
            icon: 'info',
            title: 'No hay convocatoras',
            text: this.carreraFiltro,
          });
          return;
        }
        this.validacionesSac = p.content as ValidacionSAC[];
        this.totalRegistros = p.totalElements as number;
        this.paginador._intl.itemsPerPageLabel = 'Registros por página:';
        this.paginador._intl.nextPageLabel = 'Siguiente';
        this.paginador._intl.previousPageLabel = 'Previa';
        this.paginador._intl.firstPageLabel = 'Primera Página';
        this.paginador._intl.lastPageLabel = 'Última Página';
      });
  }

  cargarCarreras() {
    this.carreraService
      .getCarreras()
      .subscribe((carreras) => (this.carreras = carreras));
  }

  public filtrarValidacionesSACCarrera() {
    if (this.carreraFiltro != null) {
      this.getValidacionesSacPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        this.carreraFiltro
      );
    } else {
      return;
    }
  }


  cargarConvocatoriasDefault() {
    this.carreraFiltro = undefined;
    return this.getValidacionesSacPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.carreraFiltro
    );
  }


  // print pdf
  async exportPdf() {
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.setFontSize(12);
    const text = `CERTIFICADO DE CUMPLIMIENTO DE PRÁCTICAS PRE PROFESIONALES`;
    const firma = '______________________';
    const responsable = this.NombreCoordinador;
    const tipo = 'Coordinador de Vinculación con la Sociedad';
    const fecha = `Cuenca, ${ this.today }`;
    const certificado = `CERTIFICADO-${ this.convocatoria.carrera.abreviatura }-PPP-${ this.date.getFullYear() }-${ this.convocatoria.id }`;

    doc.text(certificado, this.calculateMiddle(tipo, doc, 1), 120);
    doc.text(fecha, this.calculateMiddle(tipo, doc, 1) + 24, 135);

    doc.text(text, this.calculateMiddle(text, doc, 2), 200);

    doc.text(firma, this.calculateMiddle(firma, doc, 2), 700);
    doc.text(responsable, this.calculateMiddle(responsable, doc, 2), 720);
    doc.text(tipo, this.calculateMiddle(tipo, doc, 2), 740);

    doc.text('Quien suscribe, hace constar que:', 40, 260);
    const splitTitle = doc.splitTextToSize(this.bodyCertificado.replace(/(<([^>]+)>)/ig, ''), 505);
    doc.text(splitTitle, 40, 280, { maxWidth: 505, align: 'justify' });
    doc.text(`Se expide el presente certificado para los fines que el estudiante estime conveniente.`, 40, 450);

    doc.setFontSize(11);
    // tslint:disable-next-line: max-line-length
    doc.text(doc.splitTextToSize('- 240 horas de prácticas laborales, de naturaleza profesional en contextos reales de aplicación.', 479), 60, 390, { maxWidth: 479, align: 'justify' });
    // tslint:disable-next-line: max-line-length
    doc.text(doc.splitTextToSize(`- 160 horas de Prácticas de servicio comunitario, cuya naturaleza es la atención a personas, grupos o contextos de vulnerabilidad.`, 479), 60, 410, { maxWidth: 479, align: 'justify' });

    doc.save(`${ this.date }_acreditacion.pdf`);
  }

  calculateMiddle(text: any, doc: jsPDF, div: number): number {
    return (doc.internal.pageSize.width / div) - (doc.getStringUnitWidth(text) * doc.getFontSize() / div);
  }
}

export interface DialogData {
  date: Date;
  today: string;
  componentes: Componente;
  bodyCertificado: string;
  coordinador: string;
  adicional: {
    abreviatura: string,
    convocatoria_id: string
  };
}

@Component({
  selector: 'app-dialog-acreditacion',
  templateUrl: './dialog-acreditacion.html',
  styleUrls: ['./dialog-acreditacion.css']
})
export class DialogAcreditacionComponent implements AfterViewInit {
  @ViewChild('bodyCertificado', null) bodyCertificado: ElementRef;
  constructor(public dialogRef: MatDialogRef<DialogAcreditacionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
  ngAfterViewInit(): void {
    this.bodyCertificado.nativeElement.innerHTML = this.data.bodyCertificado;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
