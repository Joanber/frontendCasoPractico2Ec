import { Alumno } from "./alumno.model";
import { DetallesSeguimiento } from "./detalles-seguimiento.model";

export class Seguimiento {
  id: number;
  alumno: Alumno;
  detallesSeguimiento: DetallesSeguimiento[] = [];
}
