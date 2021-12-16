import { Empresa } from "./empresa.model";
import { ResponsablePPP } from "./responsablePPP.model";

export class SolicitudEmpresa {
  id: number;
  fecha_emision: string;
  fecha_inicio: string;
  actividades: string;
  observacion: string;
  numero_alumnos: number;
  responsablePPP: ResponsablePPP;
  empresa: Empresa;
}
