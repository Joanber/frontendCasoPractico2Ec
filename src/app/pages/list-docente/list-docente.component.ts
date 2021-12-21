import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { Docente } from 'src/app/models/docente.model';
import { CarreraService } from "src/app/services/services.models/carrera.service";
import { DocenteService } from 'src/app/services/services.models/docente.service';
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
const bd_url = environment.bd_url+"/docentes";

@Component({
  selector: 'app-list-docente',
  templateUrl: './list-docente.component.html',
  styleUrls: ['./list-docente.component.css']
})
export class ListDocenteComponent implements OnInit {

  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 10;
  public pageSizeOptions: number[] = [10, 20, 50, 100];
  //MATPAGINATOR
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
  //VARIABLE DE Docente
  public docentes: Docente[] = [];
  //VARIABLE DE LOADING
  public cargando: boolean = true;
  //VARIABLE PARA BUSCAR
  public busqueda: string = "";
  public bd_url = bd_url + "/docentes";

  constructor(private docenteService: DocenteService) {}

  ngOnInit() {
    this.getDocentesPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }

  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getDocentesPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }

  private getDocentesPage(page: string, size: string, busqueda: string) {
    this.cargando = true;
    this.docenteService.getDocentesPage(page, size, busqueda).subscribe((p) => {
      this.docentes = p.content as Docente[];
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
      this.getDocentesPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        txtBusqueda
      );
    }
  }
  cargarDocenteDefault(txtBusqueda: string) {
    if (txtBusqueda.length === 0) {
      return this.getDocentesPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        this.busqueda
      );
    }
  }
  eliminarDocente(docente: Docente) {
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
        text: `¿Seguro que quieres eliminar al Docente ${docente.abreviatura} ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.docenteService.eliminar(docente.id).subscribe((resp) => {
            this.getDocentesPage(
              this.paginaActual.toString(),
              this.totalPorPagina.toString(),
              this.busqueda
            );
            swalWithBootstrapButtons.fire(
              "Eliminada!",
              `Carrera ${docente.abreviatura} eliminada correctamente!`,
              "success"
            );
          });
        }
      });
  }
}

