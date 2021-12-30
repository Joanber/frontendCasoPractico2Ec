import { Component, OnInit } from "@angular/core";
import { ActaDR } from "src/app/models/actaDR.model";
import { ActaService } from "src/app/services/services.models/acta.service";

@Component({
  selector: "app-list-seguimientos",
  templateUrl: "./list-seguimientos.component.html",
  styleUrls: ["./list-seguimientos.component.css"],
})
export class ListSeguimientosComponent implements OnInit {
  public actasDR: ActaDR[] = [];

  constructor(private actaDRService: ActaService) {}

  ngOnInit() {
    this.cargarActas();
  }
  private cargarActas() {
    this.actaDRService.getActas().subscribe((actasDR) => {
      this.actasDR = actasDR;
      console.log(this.actasDR);
    });
  }
}
