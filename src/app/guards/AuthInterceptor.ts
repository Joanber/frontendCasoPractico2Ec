import { HTTP_INTERCEPTORS, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { UsuarioService } from "../services/services.models/usuario.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private usuarioService: UsuarioService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((e) => {
        if (e.status == 401) {
          if (this.usuarioService.isAuthenticated()) {
            this.usuarioService.logout();
          }
          this.router.navigate(["/login"]);
        }

        if (e.status == 500) {
          Swal.fire(
            "Acceso denegado",
            `Hola ${this.usuarioService.usuario.persona.primer_nombre} no tienes acceso a este recurso!`,
            "warning"
          );
          this.router.navigate(["/dashboard"]);
        }
        return throwError(e);
      })
    );
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
