import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { SolicitudEmpresa } from 'src/app/models/solicitudEmpresa.model';
import { SolicitudEmpresaService } from 'src/app/services/services.models/solicitud-empresa.service';
import { environment } from 'src/environments/environment';

const bd_url = environment.bd_url;

@Component({
  selector: 'app-list-solicitud-empresa',
  templateUrl: './list-solicitud-empresa.component.html',
  styleUrls: ['./list-solicitud-empresa.component.css']
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
public cargando: boolean = true;
//VARIABLE PARA BUSCAR
public busqueda: string = "";
public bd_url = bd_url + "/solicitudes_empresas";
constructor(private solicitudEmpresaService: SolicitudEmpresaService) {}
ngOnInit() {
  this.getSolicitudesEmpresasPage(
    this.paginaActual.toString(),
    this.totalPorPagina.toString(),
    this.busqueda
  );
}

public paginar(event: PageEvent): void {
  this.paginaActual = event.pageIndex;
  this.totalPorPagina = event.pageSize;
  this.getSolicitudesEmpresasPage(
    this.paginaActual.toString(),
    this.totalPorPagina.toString(),
    this.busqueda
  );
}

private getSolicitudesEmpresasPage(
  page: string,
  size: string,
  busqueda: string
) {
  this.cargando = true;
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
      this.cargando = false;
    });
}

buscar(txtBusqueda: string) {
  if (txtBusqueda.length > 0) {
    this.getSolicitudesEmpresasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      txtBusqueda
    );
  }
}
cargarSolicitudesEmpresasDefault(txtBusqueda: string) {
  if (txtBusqueda.length === 0) {
    return this.getSolicitudesEmpresasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }
}

}
