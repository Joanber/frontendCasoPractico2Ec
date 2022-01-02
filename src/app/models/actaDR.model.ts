import { ActividadesActasDR } from "./actividadesActasDR.model";
import { Alumno } from "./alumno.model";

export class ActaDR {
  id: number;
  fecha_inicio_ppp: string;
  fecha_emision: string;
  fecha_fin_ppp: string;
  desde: string;
  hasta: string;
  alumno: Alumno;
  actividadesActasDR: ActividadesActasDR[] = [];
  constructor() {
    this.alumno = new Alumno();
  }
  }
