import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-informacion",
  templateUrl: "./informacion.component.html",
  styleUrls: ["./informacion.component.css"],
})
export class InformacionComponent implements OnInit {
  private routeParam: string;
  private routeSub: Subscription;

  private proces = [
    {
      idproceso: "001",
      carrerap: "Electricidad",
      empresap: "Empresa Electrica",
      fechap: "10/12/2021",
      estado: "Ejecutado",
    },
    {
      idproceso: "002",
      carrerap: "Entrenamiento Deportivo",
      empresap: "Federacion deportiva del Azuay",
      fechap: "10/10/2021",
      estado: "Ejecucion",
    },
  ];
  private carrera = [
    {
      carrera: "Desarrollo de Software",
      coordinador: "Ing.Jessica Herrera",
      responsable: "Ing. Williams Trelles",
      tutor: "Ing. Doris Suquilanda",
      empresav: "Coral Centro",
    },
    {
      carrera: "Mecanica",
      coordinador: "Ing.Jessica Garcia",
      responsable: "Ing. Paul Piedra",
      tutor: "Ing. Martin Pintado",
      empresav: "Indurama",
    },
  ];
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(
      (params) => (this.routeParam = params["informacion"])
    );
  }

  getInformacion() {
    return this.routeParam;
  }
}
