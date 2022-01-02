import { Component, OnInit } from "@angular/core";
import { ActaDR } from "src/app/models/actaDR.model";
import { ActaService } from "src/app/services/services.models/acta.service";
import { SeguimientoService } from "src/app/services/services.models/seguimiento.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list-seguimientos",
  templateUrl: "./list-seguimientos.component.html",
  styleUrls: ["./list-seguimientos.component.css"],
})
export class ListSeguimientosComponent implements OnInit {
  public actasDR: ActaDR[] = [];

  constructor(
    private actaDRService: ActaService,
    private seguimientoService: SeguimientoService
  ) {}

  ngOnInit() {
    this.cargarActas();
  }
  private cargarActas() {
    this.actaDRService.getActasByTAExiste().subscribe((actasDR) => {
      this.actasDR = actasDR;
    });
  }

  eliminarSeguimiento(id: number) {
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
        text: `¿Seguro que quieres eliminar esta Designacion de Tutor Empresarial ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.seguimientoService.eliminar(id).subscribe((resp) => {
            this.cargarActas();
            swalWithBootstrapButtons.fire(
              "Eliminado!",
              `Seguimiento eliminado correctamente!`,
              "success"
            );
          });
        }
      });
  }
}
