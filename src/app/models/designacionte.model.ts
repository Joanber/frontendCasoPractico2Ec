import { Alumno } from "./alumno.model";
import { EmpresaPersonal } from "./empresaPersonal.model";

export class DesignacionTE {
  id: string;
  fecha_emision: string;
  empresaPersonal: EmpresaPersonal;
  alumno: Alumno;
}
