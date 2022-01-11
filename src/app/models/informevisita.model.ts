import { Actividadesvi } from "./actividadesvi.model";

export class InformeVisita {
  id: number;
  fecha: string;
  hora_inicio_fin: string;
  asunto: string =
    "Visita de seguimiento y obervacion del proceso de practicas pre profesionales";
  actividadesvi: Actividadesvi[] = [];
  obervaciones: string;
}
