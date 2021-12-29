import { Carrera } from "./carrera.model";
import { Persona } from "./persona.model";

export class Alumno {
  id: number;
  tipo_bachillerato: string;
  ciclo: string;
  paralelo: string;
  egresado: boolean;
  observacion: string;
  promedio_aprobado: boolean;
  te: boolean;
  ta: boolean;
  persona: Persona;
  carrera: Carrera;
 
  constructor (){
    this.persona=new Persona();
    this.carrera=new Carrera();
 }
}

