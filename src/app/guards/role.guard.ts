import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
import { Rol } from "../models/rol.models";
import { UsuarioService } from "../services/services.models/usuario.service";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.usuarioService.isAuthenticated()) {
      this.router.navigate(["/login"]);
      return false;
    }

    let role = next.data["role"] as Rol[];
    if (this.usuarioService.hasAnyRoles(role)) {
      return true;
    }
    Swal.fire(
      "Acceso denegado",
      `Hola ${this.usuarioService.usuario.persona.primer_nombre} no tienes acceso a este recurso!`,
      "warning"
    );
    this.router.navigate(["/dashboard"]);
    return false;
  }
}
