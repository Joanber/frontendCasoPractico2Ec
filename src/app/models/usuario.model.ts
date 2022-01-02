import { Persona } from "./persona.model";
import { Rol } from "./rol.models";

export class Usuario {
  id: number;
  username: string;
  password: string;
  confirmPassword: string;
  persona: Persona;
  roles: Rol[] = [];
  check: boolean = false;
}
