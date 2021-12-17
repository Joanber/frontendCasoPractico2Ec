import { Almuno } from "./alumno.model";
import { Convocatoria } from "./convocatoria.model";

export class SolicitudAlumno {
  id: number;
  fecha_emision: string;
  numero_horas: number;
  alumno: Almuno;
  convocatoria: Convocatoria;
}
