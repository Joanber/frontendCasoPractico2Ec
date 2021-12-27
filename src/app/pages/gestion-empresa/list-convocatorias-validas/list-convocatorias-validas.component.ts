import { Component, OnInit } from "@angular/core";
import { Alumno } from "src/app/models/alumno.model";
import { Convocatoria } from "src/app/models/convocatoria.model";
import { ValidacionSAC } from "src/app/models/validaciones_sac.model";
import { ValidacionesSacService } from "src/app/services/services.models/validaciones-sac.service";

@Component({
  selector: "app-list-convocatorias-validas",
  templateUrl: "./list-convocatorias-validas.component.html",
  styleUrls: ["./list-convocatorias-validas.component.css"],
})
export class ListConvocatoriasValidasComponent implements OnInit {
  public validacionesSac: ValidacionSAC[] = [];
  constructor(private validacionesSacService: ValidacionesSacService) {}

  ngOnInit() {
    this.cargarValidacionesSac();
  }

  private cargarValidacionesSac() {
    this.validacionesSacService
      .getValidaciones()
      .subscribe((validacionesSac) => {
        this.validacionesSac = validacionesSac;

        console.log(this.validacionesSac);
      });
  }
}
