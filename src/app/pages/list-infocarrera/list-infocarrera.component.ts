import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material";
import { Carrera } from "src/app/models/carrera.model";
import { CarreraService } from "src/app/services/services.models/carrera.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

const bd_url = environment.bd_url;
@Component({
  selector: "app-list-infocarrera",
  templateUrl: "./list-infocarrera.component.html",
  styleUrls: ["./list-infocarrera.component.css"],
})
export class ListInfoCarreraComponent implements OnInit {
  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 10;
  public pageSizeOptions: number[] = [10, 20, 50, 100];
  //MATPAGINATOR
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
  //VARIABLE DE CARRERAS
  public carreras: Carrera[] = [];
  //VARIABLE DE LOADING
  public cargando1: boolean = true;
  //VARIABLE PARA BUSCAR
  public busqueda: string = "";
  public bd_url = bd_url + "/infocarrera";

  constructor(private carreraService: CarreraService) {}

  ngOnInit() {
    this.getCarrerasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }

  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getCarrerasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }

  private getCarrerasPage(page: string, size: string, busqueda: string) {
    this.cargando1 = true;
    this.carreraService.getCarrerasPage(page, size, busqueda).subscribe((p) => {
      this.carreras = p.content as Carrera[];
      this.totalRegistros = p.totalElements as number;
      this.paginador._intl.itemsPerPageLabel = "Registros por página:";
      this.paginador._intl.nextPageLabel = "Siguiente";
      this.paginador._intl.previousPageLabel = "Previa";
      this.paginador._intl.firstPageLabel = "Primera Página";
      this.paginador._intl.lastPageLabel = "Última Página";
      this.cargando1 = false;
    });
  }
  buscar(txtBusqueda: string) {
    if (txtBusqueda.length > 0) {
      this.getCarrerasPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        txtBusqueda
      );
    }
  }
  cargarCarrerasDefault(txtBusqueda: string) {
    if (txtBusqueda.length === 0) {
      return this.getCarrerasPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        this.busqueda
      );
    }
  }
}
