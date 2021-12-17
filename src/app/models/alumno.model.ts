import { Carrera } from "./carrera.model";
import { Persona } from "./persona.model";

export class Almuno {
  id: number;
  tipo_bachillerato: string;
  cliclo: string;
  paralelo: string;
  egresado: boolean;
  observacion: string;
  promedio_aprobado: boolean;
  persona: Persona;
  carrera: Carrera;
}
