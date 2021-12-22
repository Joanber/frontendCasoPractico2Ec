import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Convocatoria } from "src/app/models/convocatoria.model";
import { SolicitudAlumno } from "src/app/models/solicitudAlumno.model";
import { ConvocatoriasService } from "src/app/services/services.models/convocatorias.service";
import { SolicitudAlumnoService } from "src/app/services/services.models/solicitudes-alumnos.service";


@Component({
  selector: "app-seleccionar-alumnos",
  templateUrl: "./seleccionar-alumnos.component.html",
  styleUrls: ["./seleccionar-alumnos.component.css"],
})
export class SeleccionarAlumnosComponent implements OnInit {
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



  public convocatoria = new Convocatoria();
  constructor(
    private convocatoriaService: ConvocatoriasService,
    private solicitudAlumnosService: SolicitudAlumnoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) =>
      this.cargarConvocatoria(id)
    );
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

  guardarSeleccionEstudiantes() {}

  cargarConvocatoria(id: number) {
    if (!id) {
      return;
    }
    this.convocatoriaService
      .getConvocatoriaById(id)
      .subscribe((convocatoria) => {
        this.convocatoria = convocatoria;

      });
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
}
