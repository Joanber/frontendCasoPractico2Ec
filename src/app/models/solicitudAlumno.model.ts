import { Alumno } from "./alumno.model";
import { Convocatoria } from "./convocatoria.model";

export class SolicitudAlumno {
  id: number;
  fecha_emision: string;
  numero_horas: number;
  alumno: Alumno;
  convocatoria: Convocatoria;

  constructor (){
    this.alumno=new Alumno();
    this.convocatoria=new Convocatoria();
  }
}
