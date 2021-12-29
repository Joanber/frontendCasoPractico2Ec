
import { Alumno } from "./alumno.model";
import { Docente } from "./docente.model";
import { EmpresaPersonal } from "./empresaPersonal.model";
import { ValidacionSAC } from "./validaciones_sac.model";

export class DesignacionTA {
  id: string;
  fecha_emision: string;
  alumno:Alumno;
  docente: Docente;
  validacionSAC: ValidacionSAC;
}
