import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material";
import { Carrera } from "src/app/models/carrera.model";
import { SolicitudEmpresa } from "src/app/models/solicitudEmpresa.model";
import { CarreraService } from "src/app/services/services.models/carrera.service";
import { SolicitudEmpresaService } from "src/app/services/services.models/solicitud-empresa.service";
import { environment } from "src/environments/environment";

const bd_url = environment.bd_url;
@Component({
  selector: "app-list-solicitudes-empresas-resppp",
  templateUrl: "./list-solicitudes-empresas-resppp.component.html",
  styleUrls: ["./list-solicitudes-empresas-resppp.component.css"],
})
export class ListSolicitudesEmpresasRespppComponent implements OnInit {
  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 5;
  public pageSizeOptions: number[] = [5, 10, 20, 50];
  //MATPAGINATOR
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;

  public carreraFiltro: string = undefined;
  public carreras: Carrera[] = [];
  public solicitudesEmpresas: SolicitudEmpresa[] = [];
  constructor(private solicitudEmpresaService: SolicitudEmpresaService,
    private carreraService: CarreraService,) {}

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
this.solicitudEmpresaService        .getSolicitudesEmpresasPage(page, size, carreraFiltro)
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
}
