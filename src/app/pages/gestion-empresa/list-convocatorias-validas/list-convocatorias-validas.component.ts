import { Component, OnInit } from "@angular/core";
import { DesignacionTE } from "src/app/models/designacionte.model";
import { ValidacionSAC } from "src/app/models/validaciones_sac.model";
import { DesignacionTEService } from "src/app/services/services.models/designacion-te.service";
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
      });
  }
}
