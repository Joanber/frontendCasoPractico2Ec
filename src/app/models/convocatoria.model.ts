import { Carrera } from "./carrera.model";
import { SolicitudEmpresa } from "./solicitudEmpresa.model";

export class Convocatoria {
  id: number;
  ciclo: string;
  asignaturas: string;
  actividades: string;
  fecha_max_recib_solic: string;
  fecha_emision: string;
  estado: boolean;
  carrera: Carrera;
  solicitudEmpresa: SolicitudEmpresa;
}
