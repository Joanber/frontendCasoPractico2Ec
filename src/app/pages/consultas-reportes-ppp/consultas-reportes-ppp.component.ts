import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { Carrera } from 'src/app/models/carrera.model';
import { Empresa } from 'src/app/models/empresa.model';
import { Persona } from 'src/app/models/persona.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { EmpresaService } from 'src/app/services/services.models/empresa.service';
import { PersonaService } from 'src/app/services/services.models/persona.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


const bd_url = environment.bd_url;
@Component({
  selector: 'app-consultas-reportes-ppp',
  templateUrl: './consultas-reportes-ppp.component.html',
  styleUrls: ['./consultas-reportes-ppp.component.css']
})
export class ConsultasReportesPppComponent implements OnInit {
//VARIABLES DE PAGINACION
public totalRegistros = 0;
public paginaActual = 0;
public totalPorPagina = 10;
public pageSizeOptions: number[] = [10, 20, 50, 100];
//MATPAGINATOR
@ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
//VARIABLE DE PERSONAS
public personas: Persona[] = [];
//VARIABLE DE LOADING
public cargando: boolean = true;
//VARIABLE PARA BUSCAR
public busqueda: string = "";
public bd_url = bd_url + "/tutores";

constructor(private personaService: PersonaService) {}

ngOnInit() {
  this.getPersonasPage(
    this.paginaActual.toString(),
    this.totalPorPagina.toString(),
    this.busqueda
  );
}

public paginar(event: PageEvent): void {
  this.paginaActual = event.pageIndex;
  this.totalPorPagina = event.pageSize;
  this.getPersonasPage(
    this.paginaActual.toString(),
    this.totalPorPagina.toString(),
    this.busqueda
  );
}

private getPersonasPage(page: string, size: string, busqueda: string) {
  this.cargando = true;
  this.personaService.getPersonasPage(page, size, busqueda).subscribe((p) => {
    this.personas = p.content as Persona[];
    this.totalRegistros = p.totalElements as number;
    this.paginador._intl.itemsPerPageLabel = "Registros por página:";
    this.paginador._intl.nextPageLabel = "Siguiente";
    this.paginador._intl.previousPageLabel = "Previa";
    this.paginador._intl.firstPageLabel = "Primera Página";
    this.paginador._intl.lastPageLabel = "Última Página";
    this.cargando = false;
  });
}
buscar(txtBusqueda: string) {
  if (txtBusqueda.length > 0) {
    this.getPersonasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      txtBusqueda
    );
  }
}
cargarTutoresDefault(txtBusqueda: string) {
  if (txtBusqueda.length === 0) {
    return this.getPersonasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }
}
eliminarTutor(persona: Persona) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "¿Estas  seguro?",
      text: `¿Seguro que quieres eliminar al tutor ${persona.primer_nombre}  ${persona.primer_apellido}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.value) {
        this.personaService.eliminar(persona.id).subscribe((resp) => {
          this.getPersonasPage(
            this.paginaActual.toString(),
            this.totalPorPagina.toString(),
            this.busqueda
          );
          swalWithBootstrapButtons.fire(
            "Eliminado!",
            `Tutor ${persona.primer_nombre} ${persona.primer_apellido} tutor eliminado correctamente!`,
            "success"
          );
        });
      }
    });
}
}
