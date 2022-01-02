import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material";
import { Carrera } from "src/app/models/carrera.model";
import { SolicitudEmpresa } from "src/app/models/solicitudEmpresa.model";
import { CarreraService } from "src/app/services/services.models/carrera.service";
import { SolicitudEmpresaService } from "src/app/services/services.models/solicitud-empresa.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list-solicitud-empresa",
  templateUrl: "./list-solicitud-empresa.component.html",
  styleUrls: ["./list-solicitud-empresa.component.css"],
})
export class ListSolicitudEmpresaComponent implements OnInit {
  //VARIABLES DE PAGINACION
  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 10;
  public pageSizeOptions: number[] = [10, 20, 50, 100];
  //MATPAGINATOR
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
  //VARIABLE DE PERSONAS
  public solicitudesEmpresas: SolicitudEmpresa[] = [];
  //VARIABLE DE LOADING
  //VARIABLE PARA BUSCAR
  public carreras: Carrera[] = [];
  // VARIABLES PARA BUSCAR
  public carreraFiltro: string = undefined;
  constructor(
    private solicitudEmpresaService: SolicitudEmpresaService,
    private carreraService: CarreraService
  ) {}
  ngOnInit() {
    this.cargarCarreras();
    this.getSolicitudesEmpresasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.carreraFiltro
    );
  }

  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getSolicitudesEmpresasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.carreraFiltro
    );
  }

  private getSolicitudesEmpresasPage(
    page: string,
    size: string,
    busqueda: string
  ) {
    this.solicitudEmpresaService
      .getSolicitudesEmpresasPage(page, size, busqueda)
      .subscribe((p) => {
        this.solicitudesEmpresas = p.content as SolicitudEmpresa[];
        this.totalRegistros = p.totalElements as number;
        this.paginador._intl.itemsPerPageLabel = "Registros por página:";
        this.paginador._intl.nextPageLabel = "Siguiente";
        this.paginador._intl.previousPageLabel = "Previa";
        this.paginador._intl.firstPageLabel = "Primera Página";
        this.paginador._intl.lastPageLabel = "Última Página";
      });
  }
  public filtarSolicitudeeEmpresaPorCarrera() {
    if (this.carreraFiltro != null) {
      this.getSolicitudesEmpresasPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        this.carreraFiltro
      );
    } else {
      return;
    }
  }

  cargarSolicitudesEmpresasDefault() {
    this.carreraFiltro = undefined;
    return this.getSolicitudesEmpresasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.carreraFiltro
    );
  }
  cargarCarreras() {
    this.carreraService
      .getCarreras()
      .subscribe((carreras) => (this.carreras = carreras));
  }
  eliminarSolicitudEmpresa(solicitudEmpresa: SolicitudEmpresa) {
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
        text: `¿Seguro que quieres eliminar esta Solicitud de Empresa?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.solicitudEmpresaService
            .eliminar(solicitudEmpresa.id)
            .subscribe((resp) => {
              this.getSolicitudesEmpresasPage(
                this.paginaActual.toString(),
                this.totalPorPagina.toString(),
                this.carreraFiltro
              );
              swalWithBootstrapButtons.fire(
                "Eliminada!",
                `Solicitud de empresa eliminada correctamente!`,
                "success"
              );
            });
        }
      });
  }
}
