import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { SolicitudAlumno } from 'src/app/models/solicitudAlumno.model';
import { SolicitudAlumnoService } from 'src/app/services/services.models/solicitudes-alumnos.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-solicitudes-alumnos',
  templateUrl: './list-solicitudes-alumnos.component.html',
  styleUrls: ['./list-solicitudes-alumnos.component.css']
})
export class ListSolicitudesAlumnosComponent implements OnInit {

  //VARIABLES DE PAGINACION
  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 10;
  public pageSizeOptions: number[] = [10, 20, 50, 100];
  //MATPAGINATOR
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
  //VARIABLE DE PERSONAS
  public solicitudesAlumnos: SolicitudAlumno[] = [];
  //VARIABLE DE LOADING
  public cargando: boolean = true;
  //VARIABLE PARA BUSCAR
  public busqueda: string = "";

  constructor(private solicitudAlumnosService: SolicitudAlumnoService,
    private router: Router) { }
  ngOnInit() {
    this.getSolicitudesAlumnosPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }

  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getSolicitudesAlumnosPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }

  private getSolicitudesAlumnosPage(
    page: string,
    size: string,
    busqueda: string
  ) {
    this.cargando = true;
    this.solicitudAlumnosService
      .getSolicitudesAlumnoPage(page, size, busqueda)
      .subscribe((p) => {
        this.solicitudesAlumnos = p.content as SolicitudAlumno[];
        this.totalRegistros = p.totalElements as number;
        this.paginador._intl.itemsPerPageLabel = "Registros por página:";
        this.paginador._intl.nextPageLabel = "Siguiente";
        this.paginador._intl.previousPageLabel = "Previa";
        this.paginador._intl.firstPageLabel = "Primera Página";
        this.paginador._intl.lastPageLabel = "Última Página";
        this.cargando = false;
      });
  }

  buscar(txtBusqueda: string) {
    if (txtBusqueda.length > 0) {
      this.getSolicitudesAlumnosPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        txtBusqueda
      );
    }
  }
  cargarSolicitudesAlumnosDefault(txtBusqueda: string) {
    if (txtBusqueda.length === 0) {
      return this.getSolicitudesAlumnosPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        this.busqueda
      );
    }
  }
  irListaSolicitudes() {
    this.router.navigateByUrl('/dashboard/solicitudes_estudiantes');
  }

  eliminarSolicitud(solicitudesAlumnos: SolicitudAlumno) {
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
        text: `¿Seguro que quieres eliminar esta Solicitud de ${solicitudesAlumnos.id} ?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.solicitudAlumnosService
            .eliminar(solicitudesAlumnos.id)
            .subscribe((resp) => {
              this.getSolicitudesAlumnosPage(
                this.paginaActual.toString(),
                this.totalPorPagina.toString(),
                this.busqueda
              );
              swalWithBootstrapButtons.fire(
                'Eliminada!',
                `Solicitud  de ${solicitudesAlumnos.id} eliminada correctamente!`,
                'success'
              );
            });
        }
      });
  }

}


