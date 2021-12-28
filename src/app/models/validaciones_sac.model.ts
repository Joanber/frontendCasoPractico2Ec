import { Alumno } from "./alumno.model";
import { Convocatoria } from "./convocatoria.model";

export class ValidacionSAC {
  id: number;
  fecha_emision: string;
  convocatoria: Convocatoria;
  alumnos: Alumno[] = [];
}
