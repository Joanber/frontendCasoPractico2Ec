import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { ValidacionSAC } from 'src/app/models/validaciones_sac.model';
import { ValidacionesSacService } from 'src/app/services/services.models/validaciones-sac.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-seleccion-est-emp',
  templateUrl: './list-seleccion-est-emp.component.html',
  styleUrls: ['./list-seleccion-est-emp.component.css'],
  providers: [DatePipe],
})
export class ListSeleccionEstEmpComponent implements OnInit {
  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 10;
  public pageSizeOptions: number[] = [10, 20, 50, 100];
  //MATPAGINATOR
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;

  //VARIABLE DE CONVOCATORIAS
  public validaciones :ValidacionSAC[]=[];
  //VARIABLES PARA BUSCAR
  public carreraFiltro: string = undefined;
  public busqueda: string = "";

  constructor(
    private validacionesSacService: ValidacionesSacService,
      private miDatePipe: DatePipe
  ) {}
  ngOnInit() {

    this.getValidacionesSACPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );


  }

  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getValidacionesSACPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }
  public filtarConvocatoriasPorFechaCarrera() {
    if (this.busqueda != null && this.carreraFiltro != null) {
      const fechaFormateada = this.miDatePipe.transform(
        this.busqueda,
        "yyyy-MM-dd"
      );
      this.getValidacionesSACPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        fechaFormateada
      );
    } else {
      return;
    }
  }
  cargarConvocatoriasDefault() {
    this.carreraFiltro = undefined;
    this.busqueda = "";
    return this.getValidacionesSACPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
       this.busqueda
    );
  }

  private getValidacionesSACPage(
    page: string,
    size: string,
    busqueda: string
  ) {
    this.validacionesSacService
      .getValidacionesSACPage(page, size, busqueda)
      .subscribe((p) => {
        this.validaciones = p.content as ValidacionSAC[];
        this.totalRegistros = p.totalElements as number;
        this.paginador._intl.itemsPerPageLabel = "Registros por página:";
        this.paginador._intl.nextPageLabel = "Siguiente";
        this.paginador._intl.previousPageLabel = "Previa";
        this.paginador._intl.firstPageLabel = "Primera Página";
        this.paginador._intl.lastPageLabel = "Última Página";
      });
  }



  eliminarRespuesta(vadacion: ValidacionSAC) {
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
        text: `¿Seguro que quieres eliminar esta Seleccion de la empresa ${vadacion.convocatoria.solicitudEmpresa.empresa.nombre} ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.validacionesSacService
            .eliminar(vadacion.id)
            .subscribe((resp) => {
              this.getValidacionesSACPage(
                this.paginaActual.toString(),
                this.totalPorPagina.toString(),
               this.busqueda
              );
              swalWithBootstrapButtons.fire(
                "Eliminada!",
                `Respuesta empresa ${vadacion.convocatoria.solicitudEmpresa.empresa.nombre}  eliminada correctamente!`,
                "success"
              );
            });
        }
      });
  }
  prueba(){
    for (let index = 0; index < this.validaciones.length; index++) {
      for (let i = 0; i < this.validaciones[index].alumnos.length; i++){
        console.log(this.validaciones[index].alumnos[i].persona.primer_nombre);
      }


    }
  }
}
