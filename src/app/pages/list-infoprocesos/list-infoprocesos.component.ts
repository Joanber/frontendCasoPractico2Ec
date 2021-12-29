import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { Carrera } from 'src/app/models/carrera.model';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { SolicitudEmpresa } from 'src/app/models/solicitudEmpresa.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { ConvocatoriasService } from 'src/app/services/services.models/convocatorias.service';
import { SolicitudEmpresaService } from 'src/app/services/services.models/solicitud-empresa.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-infoprocesos',
  templateUrl: './list-infoprocesos.component.html',
  styleUrls: ['./list-infoprocesos.component.css'],
  providers: [DatePipe],
})
export class ListInfoProcesosComponent implements OnInit {
  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 10;
  public pageSizeOptions: number[] = [10, 20, 50, 100];
  // MATPAGINATOR
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
  // VARIABLE DE CARRERAS
  public carreras: Carrera[] = [];
  public convocatoria: Convocatoria[] = [];
  public solicitudesEmpresa: SolicitudEmpresa[] = [];
  // VARIABLES PARA BUSCAR
  public estadoFiltro: string = undefined;
  public fecha = '' ;


  constructor(private convocatoriaService: ConvocatoriasService,
              private carreraService: CarreraService ,
              private solicitudEmpresaService: SolicitudEmpresaService,
              private miDatePipe: DatePipe) {}

  ngOnInit() {
    this.cargarEstado();
    this.getConvocatoriasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
    this.estadoFiltro,
    this.fecha
    );
  }
  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getConvocatoriasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.estadoFiltro,
      this.fecha
    );
  }
  public filtarConvocatoriasPorEstado() {
    if ( this.estadoFiltro != null) {
      this.getConvocatoriasPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        this.estadoFiltro,
        this.fecha
      );
    } else {
      return;
    }
  }
  cargarEstadoDefault() {
    this.estadoFiltro = undefined;
    return this.getConvocatoriasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.estadoFiltro,
      this.fecha
    );
  }

  private getConvocatoriasPage(
    page: string,
    size: string,
    estadoFiltro: string,
    fecha: string,
  ) {
    this.convocatoriaService
      .getConvocatoriasPage(page, size, estadoFiltro, fecha)
      .subscribe((p) => {
        this.convocatoria = p.content as Convocatoria[];
        this.totalRegistros = p.totalElements as number;
        this.paginador._intl.itemsPerPageLabel = 'Registros por página:';
        this.paginador._intl.nextPageLabel = 'Siguiente';
        this.paginador._intl.previousPageLabel = 'Previa';
        this.paginador._intl.firstPageLabel = 'Primera Página';
        this.paginador._intl.lastPageLabel = 'Última Página';
      });
  }

  cargarEstado() {
    this.convocatoriaService
      .getConvocatorias()
      .subscribe((convocatoria) => (this.convocatoria = this.convocatoria));
  }
}
