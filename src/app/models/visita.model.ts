import { Alumno } from "./alumno.model";
import { DesignacionTA } from "./designacionta.model";
import { DesignacionTE } from "./designacionte.model";
import { InformeVisita } from "./informevisita.model";

export class Visita {
  id: number;
  alumno: Alumno;
  observaciones_generales: string;
  informevisita: InformeVisita[] = [];
}
