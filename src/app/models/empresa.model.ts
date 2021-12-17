import { EmpresaPersonal } from "./empresaPersonal.model";

export class Empresa {
  id?: number;
  nombre: string;
  ruc: string;
  direccion: string;
  telefono: string;
  empresaPersonal: EmpresaPersonal;
}
