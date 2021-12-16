import { Carrera } from 'src/app/models/carrera.model';
import { Empresa } from './empresa.model';
export interface Convenio {
    id?: number;
    nombre: string;
    carrera: Carrera;
    tipo: string;
    empresa: Empresa;
}
