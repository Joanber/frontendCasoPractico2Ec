import { formatDate } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Convocatoria } from "src/app/models/convocatoria.model";
import { EmpresaPersonal } from "src/app/models/empresaPersonal.model";
import { SolicitudAlumno } from "src/app/models/solicitudAlumno.model";
import { SolicitudEmpresa } from "src/app/models/solicitudEmpresa.model";
import { ConvocatoriasService } from "src/app/services/services.models/convocatorias.service";
import { EmpresaPersonalService } from "src/app/services/services.models/empresa-personal.service";
import { EmpresaService } from "src/app/services/services.models/empresa.service";
import { PersonaService } from "src/app/services/services.models/persona.service";
import { SolicitudEmpresaService } from "src/app/services/services.models/solicitud-empresa.service";
import { SolicitudAlumnoService } from "src/app/services/services.models/solicitudes-alumnos.service";
import { environment } from "src/environments/environment";
const bd_url = environment.bd_url + "/empresas_personales";
@Component({
  selector: "app-seleccionar-alumnos",
  templateUrl: "./seleccionar-alumnos.component.html",
  styleUrls: ["./seleccionar-alumnos.component.css"],
})
export class SeleccionarAlumnosComponent implements OnInit {
  public solicitudEmpresa = new SolicitudEmpresa();
  //VARIABLES DE PAGINACION
  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 10;
  public pageSizeOptions: number[] = [10, 20, 50, 100];
  //MATPAGINATOR
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
  //VARIABLE DE PERSONAS
  public solicitudesAlumnos: SolicitudAlumno[] = [];

  public alumnosXconvocatoria: SolicitudAlumno[] = [];
  //VARIABLE DE LOADING
  public cargando: boolean = true;
  //VARIABLE PARA BUSCAR
  public busqueda: string = "";

  //Variable fecha
  today = new Date();
  jstoday = "";

  

  public convocatoria = new Convocatoria();
  constructor(
    private convocatoriaService: ConvocatoriasService,
    private solicitudAlumnosService: SolicitudAlumnoService,
    private activatedRoute: ActivatedRoute,
    private solicitudEmpresaService: SolicitudEmpresaService,
    private empresaService: EmpresaService,
    private empresaPersonalService: EmpresaPersonalService,
    private personaService: PersonaService,


  ) {
    this.jstoday = formatDate(
      this.today,
      "dd-MM-yyyy hh:mm:ss a",
      "en-US",
      "+0530"
    );
    
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) =>
      this.cargarConvocatoria(id)
    );
    this.getSolicitudesAlumnosPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
    this.filtrarPorCarrera();
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
  filtrarPorCarrera() {

      this.solicitudAlumnosService.getSolicitudesAlumnos().subscribe((solicitudes) => {
        this.solicitudesAlumnos = solicitudes;
    for (let i = 0; i <= this.solicitudesAlumnos.length; i++) {
      if (this.convocatoria.id == this.solicitudesAlumnos[i].convocatoria.id) {
        this.alumnosXconvocatoria.push(this.solicitudesAlumnos[i]);
      }
    }   }); 
  }
}
