import { Alumno } from "./alumno.model";
import { Docente } from "./docente.model";

export class DesignacionTA {
  id: string;
  fecha_emision: string;
  docente: Docente;
  alumno: Alumno;
}
