import { Carrera } from "./carrera.model";
import { Docente } from "./docente.model";

export class ResponsablePPP {
  id: number;
  carrera: Carrera;
  docente: Docente;
  constructor() {
    this.carrera = new Carrera();
    this.docente = new Docente();
 
  }
}
