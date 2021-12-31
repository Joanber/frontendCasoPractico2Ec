import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatSort, MatTableDataSource, PageEvent, Sort } from '@angular/material';
import autoTable, { UserOptions } from 'jspdf-autotable';
import { Carrera } from 'src/app/models/carrera.model';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { Empresa } from 'src/app/models/empresa.model';
import { Persona } from 'src/app/models/persona.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { ConvocatoriasService } from 'src/app/services/services.models/convocatorias.service';
import { EmpresaService } from 'src/app/services/services.models/empresa.service';
import { PersonaService } from 'src/app/services/services.models/persona.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import jsPDF, * as jspdf from 'jspdf';
import { DesignacionTA } from 'src/app/models/designacionta.model';
import { FormControl } from '@angular/forms';
import { LoaderService } from 'src/app/services/interceptores/loader.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DesignacionTaService } from 'src/app/services/services.models/designacion-ta.service';

interface jsPDFWithPlugin extends jspdf.jsPDF {
  [x: string]: any;

  autoTable: (optios: UserOptions) => jspdf.jsPDF;
}


const bd_url = environment.bd_url;
@Component({
  selector: 'app-consultas-reportes-ppp',
  templateUrl: './consultas-reportes-ppp.component.html',
  styleUrls: ['./consultas-reportes-ppp.component.css']
})
export class ConsultasReportesPppComponent implements OnInit {
  constructor(
    private designacionService: DesignacionTaService,
    private _liveAnnouncer: LiveAnnouncer,
    public loaderService: LoaderService
  ) {}

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchInput = new FormControl("");
  displayedColumns: string[] = [
    "id",
    "nombre",
    "empresa",
    "carrera",
    "acciones",
  ];
  value: any;
  public pageSizeOptions: number[] = [10, 20, 50, 100];
  dataSource = new MatTableDataSource<DesignacionTA>();
  designacionesTA: DesignacionTA[] = [];
   // Variable para almanecar localmente
   public asistenciaStorage: any[] = [];
  totalElements = 0;
  currentPage = 0;
  pageSize = 10;
  sortBy = "";
  message = "";
  search = false;
  emptyList = false;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
    this.getDesignacionesByPage(this.currentPage, this.pageSize, this.sortBy);
  }

  
  getDesignacionesByPage(page: number, size: number, sortBy: string) {
    // this.loading = true;
    this.designacionService
      .getDesiganacionesByPage(page.toString(), size.toString(), sortBy)
      .subscribe({
        next: (designacion) => {
          if (designacion.content.length === 0) {
            this.dataSource = new MatTableDataSource();
            this.emptyList = true;
          }

          this.designacionesTA = designacion.content;
          this.totalElements = designacion.totalElements;
        },
        complete: () => {
          if (this.designacionesTA.length > 0) {
            /*this.initPaginator();*/
          }
          console.warn(this.dataSource.data.length < 1);
        },
        error: (err) => console.log(err),
      });
  }

  // initPaginator() {
  //   this.dataSource = new MatTableDataSource(this.designacionesTA);
  //   this.dataSource.filterPredicate = (data: DesignacionTA, filter: string) =>
  //     data.docente.carrera.nombre.indexOf(filter) !== -1;
  //   this.dataSource.sortingDataAccessor = (convenio, property) => {
  //     switch (property) {
  //       case "empresa":
  //         return convenio.empresa.nombre;
  //       case "carrera":
  //         return convenio.carrera.nombre;
  //       default:
  //         return convenio[property];
  //     }
  //   };
  // }
  CustomPaginator(): MatPaginatorIntl {
    const customPaginatorIntl = new MatPaginatorIntl();
    customPaginatorIntl.itemsPerPageLabel = "Registros por página:";
    customPaginatorIntl.nextPageLabel = "Siguiente";
    customPaginatorIntl.previousPageLabel = "Previa";
    customPaginatorIntl.firstPageLabel = "Primera Página";
    customPaginatorIntl.lastPageLabel = "Última Página";
    return customPaginatorIntl;
  }

  paginate(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDesignacionesByPage(this.currentPage, this.pageSize, this.sortBy);
  }

  searchByCarrera(sortBy: string) {
    if (sortBy.length > 0) {
      this.search = true;
      this.getDesignacionesByPage(this.currentPage, this.pageSize, sortBy);
      if (!this.emptyList) {
        this.message = `No se encontraron registros con la carrera" ${sortBy} " `;
      }
    }
  }

  filterByCarrera(sortBy: string) {
    this.dataSource.filter = sortBy.trim().toUpperCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (sortBy === "") {
      this.dataSource.filter = "";
    }
    this.message = `Sin coincidencias para " ${sortBy} " `;
  }

  resetSearch() {
    return this.getDesignacionesByPage(
      this.currentPage,
      this.pageSize,
      this.sortBy
    );
  }

  SortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce("Sorting cleared");
    }
  }


  async exportPdf() {

    const dataBody = [];
    const data = await this.asistenciaStorage;
    const head = [['Identificación', 'Apellidos y Nombres','Email', 'Celular', 'Carrera']];
    const doc = new jsPDF('p', 'pt', 'a4');  
    //var logo = new Image();
    doc.setFontSize(14);
    // logo.src = 'src\assets\images\ista2.jpg';
    // doc.addImage(logo, 'JPEG', 20, 10, 50, 70);
    //doc.text('LOGO', 540, 15);
    doc.text('TUTORES ACADEMICOS ', 215, 100);
    
    doc.setFontSize(10);

 
    
     data.forEach( data => {
     let row = [
           
          
    // //     data.idasistencia,
    // //     this.formatoFecha(data.fechaActual),
    // //     this.formatoHora(data.horaInicio),
    // //     this.formatoHora(data.horaFin),
    // //     data.actividadRealizada,
    // //     '',
    // //     data.numeroHoras,
       ];
    //    dataBody.push(row);
      });
    console.log(dataBody);
    autoTable(doc, {
      startY: 190,
      head: head,
      body: dataBody,
    });
    doc.save('REPORTE DE TUTORES.pdf');
  }
}
