import { Carrera } from "./carrera.model";
import { Docente } from "./docente.model";
import { Empresa } from "./empresa.model";

export class ResponsablePPP {
  id: number;
  carrera: Carrera;
  docente: Docente;
  empresa: Empresa;
  constructor() {
    this.carrera = new Carrera();
    this.docente = new Docente();
    this.empresa = new Empresa();
  }
}
