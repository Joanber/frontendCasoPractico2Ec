import { Persona } from "./persona.model";
import { Rol } from "./rol.models";

export class Usuario {
  id: number;
  username: string;
  password: string;
  persona: Persona;
  roles: Rol[] = [];
  check: boolean = false;
}
