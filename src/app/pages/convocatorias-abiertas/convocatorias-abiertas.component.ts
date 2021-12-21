import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { Convocatoria } from "src/app/models/convocatoria.model";
import { ConvocatoriasService } from "src/app/services/services.models/convocatorias.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Component({
  selector: 'app-convocatorias-abiertas',
  templateUrl: './convocatorias-abiertas.component.html',
  styleUrls: ['./convocatorias-abiertas.component.css']
})
export class ConvocatoriasAbiertasComponent implements OnInit {

  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 10;
  public pageSizeOptions: number[] = [10, 20, 50, 100];

  //MATPAGINATOR
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
  //VARIABLE DE CONVOCATORIAS
  public convocatorias: Convocatoria[] = [];
  //VARIABLE DE LOADING
  public cargando: boolean = true;
  //VARIABLE PARA BUSCAR
  public busqueda: string = "";
  public fecha: string = "";
  constructor(
    private convocatoriaService: ConvocatoriasService
  ) { }

  ngOnInit() {
    this.getConvocatoriasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda,
      this.fecha
    );
  }
  
  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getConvocatoriasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda,
      this.fecha
    );
  }
  private getConvocatoriasPage(
    page: string,
    size: string,
    busqueda: string,
    fecha: string
  ) {
    this.cargando = true;
    this.convocatoriaService
      .getConvocatoriasPage(page, size, busqueda, fecha)
      .subscribe((p) => {
        this.convocatorias = p.content as Convocatoria[];
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
      this.getConvocatoriasPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        txtBusqueda,
        this.fecha
      );
    }
  }
  cargarConvocatoriasDefault(txtBusqueda: string) {
    if (txtBusqueda.length === 0) {
      return this.getConvocatoriasPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        this.busqueda,
        this.fecha
      );
    }
  }
  eliminarConvocatoria(convocatoria: Convocatoria) {
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
        text: `¿Seguro que quieres eliminar esta Convocatoria de ${convocatoria.carrera.abreviatura} ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
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
                this.busqueda,
                this.fecha
              );
              swalWithBootstrapButtons.fire(
                "Eliminada!",
                `Convocatoria de ${convocatoria.carrera.abreviatura} eliminada correctamente!`,
                "success"
              );
            });
        }
      });
  }
}

