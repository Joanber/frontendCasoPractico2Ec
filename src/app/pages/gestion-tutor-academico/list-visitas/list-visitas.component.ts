import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material";
import { Visita } from "src/app/models/visita.model";
import { VisitaService } from "src/app/services/services.models/visita.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list-visitas",
  templateUrl: "./list-visitas.component.html",
  styleUrls: ["./list-visitas.component.css"],
})
export class ListVisitasComponent implements OnInit {
  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 10;
  public pageSizeOptions: number[] = [10, 20, 50, 100];
  //MATPAGINATOR
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
  //VARIABLE DE visitas
  public visitas: Visita[] = [];
  //VARIABLE DE LOADING
  //VARIABLE PARA BUSCAR
  public busqueda: string = "";
  constructor(private visitaService: VisitaService) {}

  ngOnInit() {
    this.getVisitasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }

  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getVisitasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }

  private getVisitasPage(page: string, size: string, busqueda: string) {
    this.visitaService.getVisitasPage(page, size, busqueda).subscribe((p) => {
      this.visitas = p.content as Visita[];
      this.totalRegistros = p.totalElements as number;
      this.paginador._intl.itemsPerPageLabel = "Registros por página:";
      this.paginador._intl.nextPageLabel = "Siguiente";
      this.paginador._intl.previousPageLabel = "Previa";
      this.paginador._intl.firstPageLabel = "Primera Página";
      this.paginador._intl.lastPageLabel = "Última Página";
    });
  }

  buscar(txtBusqueda: string) {
    if (txtBusqueda.length > 0) {
      this.getVisitasPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        txtBusqueda
      );
    }
  }
  cargarVisitasDefault(txtBusqueda: string) {
    if (txtBusqueda.length === 0) {
      return this.getVisitasPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        this.busqueda
      );
    }
  }
  eliminarVisita(visita: Visita) {
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
        text: `¿Seguro que quieres eliminar esta visita?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.visitaService.eliminar(visita.id).subscribe((resp) => {
            this.getVisitasPage(
              this.paginaActual.toString(),
              this.totalPorPagina.toString(),
              this.busqueda
            );
            swalWithBootstrapButtons.fire(
              "Eliminada!",
              `Visita eliminada correctamente!`,
              "success"
            );
          });
        }
      });
  }
}
