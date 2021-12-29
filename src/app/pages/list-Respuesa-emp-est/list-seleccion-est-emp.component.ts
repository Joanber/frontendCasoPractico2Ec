import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { Router } from '@angular/router';
import { Carrera } from 'src/app/models/carrera.model';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { ValidacionSAC } from 'src/app/models/validaciones_sac.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { DesignacionTaService } from 'src/app/services/services.models/designacion-ta.service';
import { ValidacionesSacService } from 'src/app/services/services.models/validaciones-sac.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-seleccion-est-emp',
  templateUrl: './list-seleccion-est-emp.component.html',
  styleUrls: ['./list-seleccion-est-emp.component.css'],

})
export class ListSeleccionEstEmpComponent implements OnInit {
  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 5;
  public pageSizeOptions: number[] = [5, 10, 20, 50];
  //MATPAGINATOR
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
  public carreraFiltro: string = undefined;
  public validacionesSac: ValidacionSAC[] = [];
  public carreras: Carrera[] = [];

  constructor(
    private validacionesSacService: ValidacionesSacService,
    private carreraService: CarreraService,
    private designacionTAService: DesignacionTaService,
    private router: Router,
  ) {}

  ngOnInit() {
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
        this.validacionesSac = p.content as ValidacionSAC[];
        this.totalRegistros = p.totalElements as number;
        this.paginador._intl.itemsPerPageLabel = "Registros por página:";
        this.paginador._intl.nextPageLabel = "Siguiente";
        this.paginador._intl.previousPageLabel = "Previa";
        this.paginador._intl.firstPageLabel = "Primera Página";
        this.paginador._intl.lastPageLabel = "Última Página";
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



  eliminarDesignacionTA(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "¿Estas  seguro?",
        text: `¿Seguro que quieres eliminar esta Designacion de Tutor Academico ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.designacionTAService.eliminar(id).subscribe((resp) => {
            this.getValidacionesSacPage(
              this.paginaActual.toString(),
              this.totalPorPagina.toString(),
              this.carreraFiltro
            );
            swalWithBootstrapButtons.fire(
              "Eliminada!",
              `Designacion de Tutor Empresarial eliminada correctamente!`,
              "success"
            );
          });
        }
      });
  }

  eliminarRespuestaEmpresa(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "¿Estas  seguro?",
        text: `¿Seguro que quieres eliminar esta Designacion de Tutor Academico ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.validacionesSacService.eliminar(id).subscribe((resp) => {
            this.getValidacionesSacPage(
              this.paginaActual.toString(),
              this.totalPorPagina.toString(),
              this.carreraFiltro
            );
            swalWithBootstrapButtons.fire(
              "Eliminada!",
              `Designacion de Tutor Empresarial eliminada correctamente!`,
              "success"
            );
          });
        }
      });
  }
}
