import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { Carrera } from 'src/app/models/carrera.model';
import { Docente } from 'src/app/models/docente.model';
import { Empresa } from 'src/app/models/empresa.model';
import { ResponsablePPP } from 'src/app/models/responsablePPP.model';
import { ResponsablePPPService } from 'src/app/services/services.models/responsable-ppp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-responsable-ppp',
  templateUrl: './list-responsable-ppp.component.html',
  styleUrls: ['./list-responsable-ppp.component.css']
})
export class ListResponsablePPPComponent implements OnInit {

 
  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 10;
  public pageSizeOptions: number[] = [10, 20, 50, 100];
  //MATPAGINATOR
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
  //VARIABLE DE responsable
  public carreras: Carrera[] = [];
  public docentes: Docente[] = [];
  public empresas: Empresa[] = [];
  public responsablesppp: ResponsablePPP[] = [];
  //VARIABLE DE LOADING
  public cargando: boolean = true;
  //VARIABLE PARA BUSCAR
  public busqueda: string = "";


  constructor(private responsablePPPService: ResponsablePPPService) {}

  ngOnInit() {
    this.getResponsablePPPPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }

  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getResponsablePPPPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }

  private getResponsablePPPPage(page: string, size: string, busqueda: string) {
    this.cargando = true;
    this.responsablePPPService.getResponsablePPPPage(page, size, busqueda).subscribe((p) => {
      this.responsablesppp = p.content as ResponsablePPP[];
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
      this.getResponsablePPPPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        txtBusqueda
      );
    }
  }

  cargarResponsablePPPPDefault(txtBusqueda: string) {
    if (txtBusqueda.length === 0) {
      return this.getResponsablePPPPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        this.busqueda
      );
    }
  }
  eliminarResponsablePPPP(responsablePPPP: ResponsablePPP) {
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
        text: `¿Seguro que quieres eliminar el Responsable de practicas ${responsablePPPP.docente.persona.primer_nombre  +' '+   responsablePPPP.docente.persona.primer_apellido } ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.responsablePPPService.eliminar(responsablePPPP.id).subscribe((resp) => {
            this.getResponsablePPPPage(
              this.paginaActual.toString(),
              this.totalPorPagina.toString(),
              this.busqueda
            );
            swalWithBootstrapButtons.fire(
              "Eliminada!",
              `Responsable de practicas ${responsablePPPP.docente.persona.primer_nombre +' '+ responsablePPPP.docente.persona.primer_apellido} eliminada correctamente!`,
              "success"
            );
          });
        }
      });
  }

  compararResponsablePPP(d1: ResponsablePPP, d2: ResponsablePPP) {
    if (d1 === undefined && d2 === undefined) {
      return true;
    }
    return d1 == null || d2 == null ? false : d1.id === d2.id;
  }

  compararDocente(d1: Docente, d2: Docente) {
    if (d1 === undefined && d2 === undefined) {
      return true;
    }
    return d1 == null || d2 == null ? false : d1.id === d2.id;
  }
 


}
