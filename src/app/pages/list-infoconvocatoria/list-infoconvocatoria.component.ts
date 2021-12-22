import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material";
import { SolicitudEmpresa } from "src/app/models/solicitudEmpresa.model";
import { SolicitudEmpresaService } from "src/app/services/services.models/solicitud-empresa.service";
import { environment } from "src/environments/environment";
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { Carrera } from "src/app/models/carrera.model";
@Component({
  selector: "app-list-infoconvocatoria",
  templateUrl: "./list-infoconvocatoria.component.html",
  styleUrls: ["./list-infoconvocatoria.component.css"],
})
export class ListInfoConvocatoriaComponent implements OnInit {
  //VARIABLE DE CARRERAS
  public solicitudesEmpresa: SolicitudEmpresa[] = [];
  //VARIABLE DE LOADING
  public cargando1: boolean = true;
  //VARIABLE DE CARRERAS
  public carreras: Carrera[] = [];

  constructor(private solicitudEmpresaService: SolicitudEmpresaService,
              private carreraService: CarreraService) {}
  ngOnInit() {
    this.cargarSolicitudesEmpresa();
    this.getCarreras();
  }

  cargarSolicitudesEmpresa() {
    this.cargando1 = true;
    this.solicitudEmpresaService
      .getSolicitudesEmpresas()
      .subscribe((solicitudEmpresa) => {
        this.solicitudesEmpresa = solicitudEmpresa;
        this.cargando1 = false;
      });
  }
  private getCarreras() {
    this.carreraService.getCarreras().subscribe((carreras) => {
      this.carreras = carreras;
    });
  }
}
