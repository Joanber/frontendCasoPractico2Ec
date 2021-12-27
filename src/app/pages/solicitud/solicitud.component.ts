import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno.model';
import { Carrera } from 'src/app/models/carrera.model';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { Docente } from 'src/app/models/docente.model';
import { Empresa } from 'src/app/models/empresa.model';
import { AlumnoService } from 'src/app/services/services.models/alumno.service';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { ConvocatoriasService } from 'src/app/services/services.models/convocatorias.service';
import { DocenteService } from 'src/app/services/services.models/docente.service';
import { EmpresaService } from 'src/app/services/services.models/empresa.service';
const loggedUser = localStorage.getItem("usuario");
@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  user:any;
  public alumno: Alumno;
 //VARIABLE DE LOADING
 public cargando: boolean = true;
 //VARIABLE PARA BUSCAR
 public busqueda: string = "";

 public convocatoria = new Convocatoria();
 constructor(
   private convocatoriaService: ConvocatoriasService,
   private activatedRoute: ActivatedRoute,
   private alumnoService: AlumnoService
  
 ) {}

 ngOnInit() {
   this.activatedRoute.params.subscribe(({ id }) =>
     this.cargarConvocatoria(id)
   );
   this.user =JSON.parse(loggedUser);
   /*this.alumnoService.getById(this.user.username).subscribe(data =>{
    this.alumno=data;
    console.log(this.alumno.paralelo);
   });*/
 }

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


 llamarUsuario() {
  let user =JSON.parse(loggedUser)
 console.log( user.username);
 };

}
