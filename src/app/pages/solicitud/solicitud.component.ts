import { formatDate } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from 'src/app/models/alumno.model';
import { Carrera } from 'src/app/models/carrera.model';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { Docente } from 'src/app/models/docente.model';
import { Empresa } from 'src/app/models/empresa.model';
import { SolicitudAlumno } from 'src/app/models/solicitudAlumno.model';
import { AlumnoService } from 'src/app/services/services.models/alumno.service';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { ConvocatoriasService } from 'src/app/services/services.models/convocatorias.service';
import { DocenteService } from 'src/app/services/services.models/docente.service';
import { EmpresaService } from 'src/app/services/services.models/empresa.service';
import { SolicitudAlumnoService } from 'src/app/services/services.models/solicitudes-alumnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {
  user:any;
public alumno=new Alumno();
 //VARIABLE DE LOADING
 public cargando: boolean = true;
 //VARIABLE PARA BUSCAR
 public busqueda: string = "";
//VARIABLE DE FECHA 
today = new Date();
jstoday = '';

 public convocatoria = new Convocatoria();
 constructor(
   private convocatoriaService: ConvocatoriasService,
   private activatedRoute: ActivatedRoute,
   private alumnoService: AlumnoService,
   private solicitudAlumnosrv: SolicitudAlumnoService
   
 ) {
  this.jstoday = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');

 }
 ngOnInit() {
   this.activatedRoute.params.subscribe(({ id }) =>
     this.cargarConvocatoria(id)
   );
 }

 cargarConvocatoria(id: number) {
  if (!id) {
    return;
  }
  this.convocatoriaService
    .getConvocatoriaById(id)
    .subscribe({
      next: (convocatoria)=> this.convocatoria=convocatoria,
      complete: () => {
        this.user = JSON.parse(localStorage.getItem("usuario"));
        this.alumnoService.getAlumnoByPersonaId(this.user.id).subscribe(data => {
          this.alumno = data;
        });

    }});
 }
 
 ObtenerFecha(){
  let fechaEmision =new Date();
  let mes = fechaEmision.getMonth();
  let dia = fechaEmision.getDate();
  let  messtr,diastr;
  
  if(messtr<10){
    messtr="0"+mes;
  }else {
    messtr=""+mes;
  }
  if(diastr<10){
    diastr="0"+dia;
  }else {
    diastr=""+dia;
  }
  return fechaEmision.getFullYear()+"-"+messtr+"-"+diastr;
 }

  llamarUsuario() {
    let solicitudAlumno = new SolicitudAlumno();
    solicitudAlumno.id=this.alumno.persona.id;
    solicitudAlumno.fecha_emision=this.ObtenerFecha();
    solicitudAlumno.numero_horas=240;
    solicitudAlumno.alumno=this.alumno;
    solicitudAlumno.convocatoria=this.convocatoria;
    console.log(this.ObtenerFecha());
    this.solicitudAlumnosrv.crear(solicitudAlumno).subscribe(data=>{
      console.log(data);
      Swal.fire(
        "Solicitud Estudiante",
        `creada con exito!`,
        "success"
      );
      /*this.irListaEmpresa();*/
      console.log("Solicitud Exitosa");

    },
    error=>console.log("ha ocurrido un error")
    );
 };

}
