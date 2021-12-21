import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material";
import { ResponsablePPP } from "src/app/models/responsablePPP.model";
import { ResponsablePPPService } from "src/app/services/services.models/responsable-ppp.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-list-infocarrera",
  templateUrl: "./list-infocarrera.component.html",
  styleUrls: ["./list-infocarrera.component.css"],
})
export class ListInfoCarreraComponent implements OnInit {
  //VARIABLE DE CARRERAS
  public responsablesPPP: ResponsablePPP[] = [];
  //VARIABLE DE LOADING
  public cargando1: boolean = true;

  constructor(private responsablePPPService: ResponsablePPPService) {}

  ngOnInit() {
    this.cargarResponsablesPPP();
  }

  cargarResponsablesPPP() {
    this.cargando1 = true;
    this.responsablePPPService
      .getResponsablePPP()
      .subscribe((responsablePPP) => {
        this.responsablesPPP = responsablePPP;
        this.cargando1 = false;
      });
  }
}
