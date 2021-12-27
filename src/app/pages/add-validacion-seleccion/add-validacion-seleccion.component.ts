
import { formatDate } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { Convocatoria } from "src/app/models/convocatoria.model";
import { SolicitudAlumno } from "src/app/models/solicitudAlumno.model";
import { SolicitudEmpresa } from "src/app/models/solicitudEmpresa.model";
import { ConvocatoriasService } from "src/app/services/services.models/convocatorias.service";
import { EmpresaPersonalService } from "src/app/services/services.models/empresa-personal.service";
import { EmpresaService } from "src/app/services/services.models/empresa.service";
import { PersonaService } from "src/app/services/services.models/persona.service";
import { SolicitudEmpresaService } from "src/app/services/services.models/solicitud-empresa.service";
import { SolicitudAlumnoService } from "src/app/services/services.models/solicitudes-alumnos.service";

@Component({
  selector: 'app-add-validacion-seleccion',
  templateUrl: './add-validacion-seleccion.component.html',
  styleUrls: ['./add-validacion-seleccion.component.css']
})
export class AddValidacionSeleccionComponent implements OnInit {
  parentSelector: boolean = false;



  public solicitudEmpresa = new SolicitudEmpresa();


  //VARIABLE DE PERSONAS
  public solicitudesAlumnos: SolicitudAlumno[] = [];

  public alumnosXconvocatoria: SolicitudAlumno[] = [];

  //Variable fecha
  today = new Date();
  jstoday = "";

  public convocatoria = new Convocatoria();
  constructor(
    private convocatoriaService: ConvocatoriasService,
    private solicitudAlumnosService: SolicitudAlumnoService,
    private activatedRoute: ActivatedRoute,
    private solicitudEmpresaService: SolicitudEmpresaService,
    private empresaService: EmpresaService,
    private empresaPersonalService: EmpresaPersonalService,
    private personaService: PersonaService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) =>
      this.cargarConvocatoria(id)
    );

    this.getSolicitudesAlumnos();
  }



  guardarSeleccionEstudiantes() {}

  cargarConvocatoria(id: number) {
    if (!id) {
      return;
    }
    this.convocatoriaService
      .getConvocatoriaById(id)
      .subscribe((convocatoria) => {
        this.convocatoria = convocatoria;
      });
  }
getSolicitudesAlumnos(){
  this.solicitudAlumnosService.getSolicitudesAlumnos().subscribe((solicitudes)=>{
    this.solicitudesAlumnos = solicitudes;
    for (let i = 0; i < this.solicitudesAlumnos.length; i++) {
      if (
        this.convocatoria.id === this.solicitudesAlumnos[i].convocatoria.id
      ) {
        this.alumnosXconvocatoria.push(this.solicitudesAlumnos[i]);
      }
    }
  });
}

}
