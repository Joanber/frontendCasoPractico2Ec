import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  private routeSub: Subscription;
  private routeParam: string;
  private students = [
    {
      idconvocatoria: "001",
      carrera: "Desarrollo de Software",
      empresa: "Coral centro",
      fecha: "10/12/2021",
      cantalumnos: "8",
      encargado: "Ing.Trelles",
    },
    {
      idconvocatoria: "002",
      carrera: "Mecanica",
      empresa: "Indurama",
      fecha: "10/12/2021",
      cantalumnos: "5",
      encargado: "Ing. Salamea",
    },
    {
      idconvocatoria: "003",
      carrera: "Electricidad",
      empresa: "Empresa Electrica",
      fecha: "10/12/2021",
      cantalumnos: "6",
      encargado: "Ing, Martinez",
    },
  ];
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
