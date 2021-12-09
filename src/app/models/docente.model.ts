import { Persona } from "./persona.model";

export class Docente {
  id: number;
  abreviatura: string;
  tipo_tiempo: string;
  titulo_docente: string;
  observacion: string;
  persona: Persona;
}
