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

  constructor(private docenteService: DocenteService) {}

  ngOnInit() {
    this.getDocentePage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }

  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getDocentePage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }

  private getDocentePage(page: string, size: string, busqueda: string) {
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
      this.getDocentePage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        txtBusqueda
      );
    }
  }
  cargarDocenteSDefault(txtBusqueda: string) {
    if (txtBusqueda.length === 0) {
      return this.getDocentePage(
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
        text: `¿Seguro que quieres eliminar al Docente ${ docente.persona.primer_nombre +' '+  docente.persona.primer_apellido} ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.docenteService.eliminar(docente.id).subscribe((resp) => {
            this.getDocentePage(
              this.paginaActual.toString(),
              this.totalPorPagina.toString(),
              this.busqueda
            );
            swalWithBootstrapButtons.fire(
              "Eliminada!",
              `Docente ${docente.persona.primer_nombre +' '+  docente.persona.primer_apellido} eliminado (a) correctamente!`,
              "success"
            );
          });
        }
      });
  }

  compararCoordinador(d1: Docente, d2: Docente) {
    if (d1 === undefined && d2 === undefined) {
      return true;
    }
    return d1 == null || d2 == null ? false : d1.id === d2.id;
  }

}

