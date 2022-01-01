import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, PageEvent } from '@angular/material';
import { Carrera } from 'src/app/models/carrera.model';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { SolicitudEmpresa } from 'src/app/models/solicitudEmpresa.model';
import { ConvocatoriasService } from 'src/app/services/services.models/convocatorias.service';
import { ColorsService } from 'src/app/services/shared/colors.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estado-procesos-ppp',
  templateUrl: './estado-procesos-ppp.component.html',
  styleUrls: ['./estado-procesos-ppp.component.css'],
  providers: [DatePipe],
})

export class EstadoProcesosPppComponent implements OnInit {
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
  public estadoFiltro = undefined;
  public fecha = '';

  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];

  selected = '';

  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;

  status: any[] = [];
  currentStatus = {} as any;
  defaultStatus = { style: {}, styleSelect: {}, name: '', color: '', estado: undefined };

  constructor(private color: ColorsService, private convocatoriaService: ConvocatoriasService, private miDatePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.color.status$.subscribe(status => this.status = status);
    this.cargarEstadoDefault();
  }

  changeStatus(status: any) {
    this.currentStatus = status || this.defaultStatus;
    if (this.currentStatus.estado === undefined && this.currentStatus.name === 'Por cumplir el plazo') {
      this.getConvocatoriasPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        this.estadoFiltro
      );
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1200,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
      Toast.fire({
        icon: 'info',
        title: `No hay procesos disponibles!`,
      });
      return;
    }
    if (this.currentStatus.estado === undefined) {
      this.cargarEstadoDefault();
    }

    if (this.currentStatus.estado !== undefined) {
      console.log(this.currentStatus.estado);
      if (this.currentStatus.estado !== true) {
        this.getConvocatoriasPage(
          this.paginaActual.toString(),
          this.totalPorPagina.toString(),
          'false'
        );
      } else {
        this.getConvocatoriasPage(
          this.paginaActual.toString(),
          this.totalPorPagina.toString(),
          'true'
        );
      }
    }
  }

  cargarEstadoDefault() {
    this.estadoFiltro = undefined;
    return this.getConvocatoriasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.estadoFiltro
    );
  }

  private getConvocatoriasPage(
    page: string,
    size: string,
    estadoFiltro: string
  ) {
    this.convocatoriaService
      .getConvocatoriasPageAndEstado(page, size, estadoFiltro)
      .subscribe((p) => {
        this.convocatoria = p.content as Convocatoria[];
        this.totalRegistros = p.totalElements as number;
        this.paginador._intl.itemsPerPageLabel = 'Registros por página:';
        this.paginador._intl.nextPageLabel = 'Siguiente';
        this.paginador._intl.previousPageLabel = 'Previa';
        this.paginador._intl.firstPageLabel = 'Primera Página';
        this.paginador._intl.lastPageLabel = 'Última Página';
      }, err => console.warn(err));
  }
  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getConvocatoriasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.estadoFiltro,
    );
  }
}
