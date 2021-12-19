import { Docente } from "./docente.model";

export class Carrera {
  id: number;
  fecha_fin: string;
  fecha_inicio: string;
  modalidad: string;
  nombre: string;
  abreviatura: string;
  docente: Docente;
}
