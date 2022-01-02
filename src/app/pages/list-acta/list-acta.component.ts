import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material";
import { ActaDR } from "src/app/models/actaDR.model";
import { Carrera } from "src/app/models/carrera.model";
import { ActaService } from "src/app/services/services.models/acta.service";
import { CarreraService } from "src/app/services/services.models/carrera.service";

@Component({
  selector: "app-list-acta",
  templateUrl: "./list-acta.component.html",
  styleUrls: ["./list-acta.component.css"],
})
export class ListActaComponent implements OnInit {
  public totalRegistros = 0;

  // VARIABLE DE ACTAS
  public actas: ActaDR[] = [];

  constructor(private actaService: ActaService) {}
  ngOnInit() {
    this.getActas();
  }

  private getActas() {
    this.actaService.getActas().subscribe((actas) => (this.actas = actas));
  }
}
