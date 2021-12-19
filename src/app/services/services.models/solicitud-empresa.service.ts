import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { SolicitudEmpresa } from "src/app/models/solicitudEmpresa.model";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
const bd_url = environment.bd_url + "/solicitudes_empresas";
@Injectable({
  providedIn: "root",
})
export class SolicitudEmpresaService {
  constructor(private http: HttpClient) {}
  //SOLICITUDES EMPRESAS
  getSolicitudesEmpresas(): Observable<SolicitudEmpresa[]> {
    return this.http.get<SolicitudEmpresa[]>(`${bd_url}/filtrar`);
  }

  //PAGINACION DE solicitudes empresas
  getSolicitudesEmpresasPage(
    page: string,
    size: string,
    busqueda: string
  ): Observable<any> {
    return this.http
      .get(
        `${bd_url}/page?page=${page}&size=${size}&busqueda=${busqueda || ""} `
      )
      .pipe(
        tap((response: any) => {
          (response.content as SolicitudEmpresa[]).forEach(
            (solicitudEmpresa) => {
              return solicitudEmpresa;
            }
          );
        }),
        map((response: any) => {
          (response.content as SolicitudEmpresa[]).map((solicitudEmpresa) => {
            return solicitudEmpresa;
          });
          return response;
        })
      );
  }

  //CREAR SOLICITUD EMPRESA
  crear(solicitudEmpresa: SolicitudEmpresa): Observable<SolicitudEmpresa> {
    return this.http
      .post<SolicitudEmpresa>(`${bd_url}/`, solicitudEmpresa)
      .pipe(
        map((response: any) => response.solicitudEmpresa as SolicitudEmpresa),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, "error");
          return throwError(e);
        })
      );
  }
  //EDITAR SolicitudEmpresa
  editar(
    solicitudEmpresa: SolicitudEmpresa,
    id: number
  ): Observable<SolicitudEmpresa> {
    return this.http
      .put<SolicitudEmpresa>(`${bd_url}/${id}`, solicitudEmpresa)
      .pipe(
        map((response: any) => response.solicitudEmpresa as SolicitudEmpresa),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, "error");
          return throwError(e);
        })
      );
  }
  //ELIMINAR UNA SolicitudEmpresa
  eliminar(id: number): Observable<SolicitudEmpresa> {
    return this.http.delete<SolicitudEmpresa>(`${bd_url}/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  //OBTENER UNA SOLICITUD EMPRESA POR ID
  getSolicitudEmpresaById(id: number): Observable<SolicitudEmpresa> {
    return this.http.get<SolicitudEmpresa>(`${bd_url}/${id}`);
  }
}
