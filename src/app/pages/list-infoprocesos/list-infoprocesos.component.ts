import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { Carrera } from 'src/app/models/carrera.model';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { SolicitudEmpresa } from 'src/app/models/solicitudEmpresa.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { ConvocatoriasService } from 'src/app/services/services.models/convocatorias.service';
import { SolicitudEmpresaService } from 'src/app/services/services.models/solicitud-empresa.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-infoprocesos',
  templateUrl: './list-infoprocesos.component.html',
  styleUrls: ['./list-infoprocesos.component.css'],
})
export class ListInfoProcesosComponent implements OnInit {
  // VARIABLE DE CARRERAS
  public carreras: Carrera[] = [];
  public convocatoria: Convocatoria[] = [];
  public solicitudesEmpresa: SolicitudEmpresa[] = [];
  // VARIABLE DE LOADING
  public cargando1 = true;

  constructor(private convocatoriasService: ConvocatoriasService,
              private carreraService: CarreraService ,
              private solicitudEmpresaService: SolicitudEmpresaService) {}

  ngOnInit() {
    this.cargarConvocatoria();
  }

  cargarConvocatoria() {
    this.cargando1 = true;
    this.convocatoriasService
      .getConvocatorias()
      .subscribe((convocatoria) => {
        this.convocatoria = convocatoria;
        this.cargando1 = false;
      });
  }
}
