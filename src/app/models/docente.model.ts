import { Persona } from "./persona.model";

export class Docente {
  id: number;
  abreviatura_titulo: string;
  tipo_tiempo: string;
  titulo_docente: string;
  observacion: string;
  persona: Persona;
  constructor() {
    this.persona = new Persona();
  }
}
