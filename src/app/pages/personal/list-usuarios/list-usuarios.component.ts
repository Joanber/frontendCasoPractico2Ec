import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material";
import { Usuario } from "src/app/models/usuario.model";
import { UsuarioService } from "src/app/services/services.models/usuario.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list-usuarios",
  templateUrl: "./list-usuarios.component.html",
  styleUrls: ["./list-usuarios.component.css"],
})
export class ListUsuariosComponent implements OnInit {
  //VARIABLES DE PAGINACION
  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 10;
  public pageSizeOptions: number[] = [10, 20, 50, 100];
  //MATPAGINATOR
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
  //VARIABLE DE PERSONAS
  public usuarios: Usuario[] = [];
  //VARIABLE PARA BUSCAR
  public busqueda: string = "";
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.getUsuariosPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }
  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getUsuariosPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }

  private getUsuariosPage(page: string, size: string, busqueda: string) {
    this.usuarioService.getUsuariosPage(page, size, busqueda).subscribe((p) => {
      this.usuarios = p.content as Usuario[];
      this.totalRegistros = p.totalElements as number;
      this.paginador._intl.itemsPerPageLabel = "Registros por página:";
      this.paginador._intl.nextPageLabel = "Siguiente";
      this.paginador._intl.previousPageLabel = "Previa";
      this.paginador._intl.firstPageLabel = "Primera Página";
      this.paginador._intl.lastPageLabel = "Última Página";
    });
  }

  cargarUsuariosDefault(txtBusqueda: string) {
    if (txtBusqueda.length === 0) {
      return this.getUsuariosPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        this.busqueda
      );
    }
  }
  buscar(txtBusqueda: string) {
    if (txtBusqueda.length > 0) {
      this.getUsuariosPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        txtBusqueda
      );
    }
  }

  eliminarUsuario(usuario: Usuario) {
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
        text: `¿Seguro que quieres eliminar este usuario?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.usuarioService.eliminar(usuario.id).subscribe((resp) => {
            this.getUsuariosPage(
              this.paginaActual.toString(),
              this.totalPorPagina.toString(),
              this.busqueda
            );
            swalWithBootstrapButtons.fire(
              "Eliminado!",
              `Usuario eliminado correctamente!`,
              "success"
            );
          });
        }
      });
  }
}
