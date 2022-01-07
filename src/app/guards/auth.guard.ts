import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router
} from "@angular/router";
import Swal from "sweetalert2";
import { UsuarioService } from "../services/services.models/usuario.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private usuarioService: UsuarioService, private router: Router) {}
  canActivateChild(childRoute: ActivatedRouteSnapshot): boolean {
      if (childRoute.data.roles && !this.usuarioService.hasRoles(childRoute.data.roles)) {
        this.router.navigateByUrl('/dashboard');
        Swal.fire(
          'Acceso denegado',
          `Hola ${ this.usuarioService.usuario.persona.primer_nombre } no tienes acceso a este recurso!`,
          'warning'
        );
        return false;
      }
      return true;
  }
  canActivate(): boolean {
    if (this.usuarioService.isAuthenticated()) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
