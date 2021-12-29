import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { TouchSequence } from 'selenium-webdriver';
import { Carrera } from 'src/app/models/carrera.model';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { SolicitudAlumno } from 'src/app/models/solicitudAlumno.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { ConvocatoriasService } from 'src/app/services/services.models/convocatorias.service';
import { SolicitudAlumnoService } from 'src/app/services/services.models/solicitudes-alumnos.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-convocatorias',
  templateUrl: './list-convocatorias.component.html',
  styleUrls: ['./list-convocatorias.component.css'],
  providers: [DatePipe],
})
export class ListConvocatoriasComponent implements OnInit {
  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 10;
  public pageSizeOptions: number[] = [10, 20, 50, 100];
  // MATPAGINATOR
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;

  // VARIABLE DE CONVOCATORIAS
  public convocatorias: Convocatoria[] = [];
  public solicitudAlumno: SolicitudAlumno[] = [];
  public carreras: Carrera[] = [];
  // VARIABLES PARA BUSCAR
  public carreraFiltro: string = undefined;
  public fecha = '';

  constructor(
    private convocatoriaService: ConvocatoriasService,
    private solicitudAlumnoService: SolicitudAlumnoService,
    private carreraService: CarreraService,
    private miDatePipe: DatePipe
  ) {}
  ngOnInit() {
    this.cargarCarreras();
    this.getConvocatoriasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.carreraFiltro,
      this.fecha
    );
    this.getSolicitudAlumno();

  }

  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getConvocatoriasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.carreraFiltro,
      this.fecha
    );
  }
  public filtarConvocatoriasPorFechaCarrera() {
    if (this.fecha != null && this.carreraFiltro != null) {
      const fechaFormateada = this.miDatePipe.transform(
        this.fecha,
        'yyyy-MM-dd'
      );
      this.getConvocatoriasPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        this.carreraFiltro,
        fechaFormateada
      );
    } else {
      return;
    }
  }
  cargarConvocatoriasDefault() {
    this.carreraFiltro = undefined;
    this.fecha = '';
    return this.getConvocatoriasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.carreraFiltro,
      this.fecha
    );
  }

  private getConvocatoriasPage(
    page: string,
    size: string,
    carreraFiltro: string,
    fecha: string
  ) {
    this.convocatoriaService
      .getConvocatoriasPage(page, size, carreraFiltro, fecha)
      .subscribe((p) => {
        this.convocatorias = p.content as Convocatoria[];
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

  getSolicitudAlumno() {
    this.solicitudAlumnoService
      .getSolicitudesAlumnos()
      .subscribe(
        (solicitudAlumnos) => (this.solicitudAlumno = solicitudAlumnos)
      );
  }

  cargarNumeroSolicitudAlumno(id: number) {
    let cont = 0;
    for (let i = 0; i < this.solicitudAlumno.length; i++) {
      if ((id === this.solicitudAlumno[i].convocatoria.id)) {
        cont ++;

      }
    }
    return cont;
  }

  eliminarConvocatoria(convocatoria: Convocatoria) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: '¿Estas  seguro?',
        text: `¿Seguro que quieres eliminar esta Convocatoria de ${convocatoria.carrera.abreviatura} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.convocatoriaService
            .eliminar(convocatoria.id)
            .subscribe((resp) => {
              this.getConvocatoriasPage(
                this.paginaActual.toString(),
                this.totalPorPagina.toString(),
                this.carreraFiltro,
                this.fecha
              );
              swalWithBootstrapButtons.fire(
                'Eliminada!',
                `Convocatoria de ${convocatoria.carrera.abreviatura} eliminada correctamente!`,
                'success'
              );
            });
        }
      });
  }
}
