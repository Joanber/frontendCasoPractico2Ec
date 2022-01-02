import { Alumno } from "./alumno.model";
import { Docente } from "./docente.model";

export class DesignacionTA {
  id: number;
  fecha_emision: string;
  docente: Docente;
  alumno: Alumno;

constructor() {
  this.docente = new Docente();
  this.alumno = new Alumno();
}
}
