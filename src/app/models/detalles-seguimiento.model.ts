import { ActividadesActasDR } from "./actividadesActasDR.model";

export class DetallesSeguimiento {
  id: number;
  actividadesActasDR: ActividadesActasDR;
  fecha: string;
  fecha_fin_pre: string;
  porcentaje: number;
  observaciones: string;
  no: string;
}
