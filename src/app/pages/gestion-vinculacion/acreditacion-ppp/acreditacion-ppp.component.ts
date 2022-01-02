import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButton, MatDialog, MatDialogRef, MatPaginator, MAT_DIALOG_DATA, PageEvent } from '@angular/material';
import jsPDF, * as jspdf from 'jspdf';
import { UserOptions } from 'jspdf-autotable';
import { Carrera } from 'src/app/models/carrera.model';
import { Persona } from 'src/app/models/persona.model';
import { SolicitudEmpresa } from 'src/app/models/solicitudEmpresa.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { SolicitudEmpresaService } from 'src/app/services/services.models/solicitud-empresa.service';
import Swal from 'sweetalert2';
interface jsPDFWithPlugin extends jspdf.jsPDF {
  [x: string]: any;

  autoTable: (optios: UserOptions) => jspdf.jsPDF;
}
export interface Componente {
  simbol: string;
  data: any;
}
@Component({
  selector: 'app-acreditacion-ppp',
  templateUrl: './acreditacion-ppp.component.html',
  styleUrls: ['./acreditacion-ppp.component.css']
})
export class AcreditacionPppComponent implements OnInit {
  public acreditaciones: any[] = [];
  constructor(public dialog: MatDialog, private solicitudEmpresaService: SolicitudEmpresaService,
              private carreraService: CarreraService, ) {}

  get bodyCertificado(): string {
    const estudiante = 'ÁLVAREZ TOLEDO JÉSSICA GUADALUPE';
    const cedula = '0107340093';
    const carrera = 'Tecnología Superior en Desarrollo de Software';
    // tslint:disable-next-line: max-line-length
    const body = `Una vez revisada la documentación entregada por el estudiante <strong>${ estudiante }</strong>,portadora de la cédula de ciudadanía número <strong>${ cedula }</strong>, de la carrera de <strong>${ carrera }</strong> del Instituto Superior Tecnológico del Azuay ha cumplido con todos los requisitos establecidos en la ley para acreditar <strong>SATISFACTORIAMENTE</strong> las <strong>400 horas</strong> de prácticas pre profesionales, las cuales fueron desarrolladas cumpliendo con los dos componentes dispuestos en el Artículo 53 del Reglamento de Régimen Académico y en el proyecto de la carrera correspondiente:`;
    // this.cert.nativeElement.innerHTML = body;
    return body;
  }

  get NombreCoordinador(): string {
    const nombre = this.cordinador.primer_nombre + ' ' + this.cordinador.primer_apellido;
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLocaleLowerCase();
  }
  // @ViewChild('cert', null) cert: ElementRef;
  @ViewChild(MatButton, null) button: MatButton;

  cordinador: Persona;
  today: string;
  date = new Date();

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


  // /otross
  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 5;
  public pageSizeOptions: number[] = [5, 10, 20, 50];
  // MATPAGINATOR
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;

  public carreraFiltro: string = undefined;
  public carreras: Carrera[] = [];
  public solicitudesEmpresas: SolicitudEmpresa[] = [];

  ngOnInit() {
    this.cordinador = JSON.parse(localStorage.getItem('usuario')).persona;

    const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    this.today = this.date.toLocaleDateString(undefined, options);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAcreditacionComponent, {
      data: {
        date: this.date, today: this.today, componentes: this.componentes,
        bodyCertificado: this.bodyCertificado, coordinador: this.NombreCoordinador
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
    this.solicitudEmpresaService.getSolicitudesEmpresasPage(page, size, carreraFiltro)
      .subscribe((p) => {
        this.solicitudesEmpresas = p.content as SolicitudEmpresa[];
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
    const responsable = `Ing`;
    const tipo = 'Coordinador de Vinculación con la Sociedad';
    const fecha = `Cuenca, ${ this.today }`;
    const certificado = `CERTIFICADO-TSDS-PPP-${ this.date.getFullYear() }`;

    doc.text(certificado, this.calculateMiddle(tipo, doc, 1), 120);
    doc.text(fecha, this.calculateMiddle(tipo, doc, 1) + 24, 135);

    doc.text(text, this.calculateMiddle(text, doc, 2), 200);

    doc.text(firma, this.calculateMiddle(firma, doc, 2), 700);
    doc.text(responsable, this.calculateMiddle(responsable, doc, 2), 720);
    doc.text(tipo, this.calculateMiddle(tipo, doc, 2), 740);

    doc.text('Quien suscribe, hace constar que:', 40, 260);
    const splitTitle = doc.splitTextToSize(this.bodyCertificado.replace(/(<([^>]+)>)/ig, ''), 499);
    doc.text(splitTitle, 40, 280, { maxWidth: 499, align: 'justify' });
    doc.text(`Se expide el presente certificado para los fines que el estudiante estime conveniente.`, 40, 450);

    doc.setFontSize(11);
    // tslint:disable-next-line: max-line-length
    doc.text(doc.splitTextToSize('- 240 horas de prácticas laborales, de naturaleza profesional en contextos reales de aplicación.', 479), 60, 390, { maxWidth: 479, align: 'justify' });
    // tslint:disable-next-line: max-line-length
    doc.text(doc.splitTextToSize(`- 160 horas de Prácticas de servicio comunitario, cuya naturaleza es la atención a personas, grupos o contextos de vulnerabilidad.`, 479), 60, 410, { maxWidth: 479, align: 'justify' });

    doc.save(`${this.date}_acreditacion.pdf`);
  }

  calculateMiddle(text: any, doc: jsPDF , div: number): number {
    return (doc.internal.pageSize.width / div) - (doc.getStringUnitWidth(text) * doc.getFontSize() / div);
  }
}

export interface DialogData {
  date: Date;
  today: string;
  componentes: Componente;
  bodyCertificado: string;
  coordinador: string;
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
