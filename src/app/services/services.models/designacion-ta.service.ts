import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { DesignacionTA } from "src/app/models/designacionta.model";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

const bd_url = environment.bd_url + "/designaciones_ta";
@Injectable({
  providedIn: "root",
})
export class DesignacionTaService {
  constructor(private http: HttpClient) {}

  //OBTENER UNA DESIGNACION_TE POR ID
  getDesignacionTAById(id: number): Observable<DesignacionTA> {
    return this.http.get<DesignacionTA>(`${bd_url}/${id}`);
  }
  getDesignacionTAByAlumnoId(id: number): Observable<DesignacionTA> {
    return this.http.get<DesignacionTA>(`${bd_url}/alumno/${id}`);
  }

  //DESIGNACION_TA SIN PAGINACION
  getDesiganacionesTA(): Observable<DesignacionTA[]> {
    return this.http.get<DesignacionTA[]>(`${bd_url}/filtrar`);
  }
  //GET TUTORES PAGINACION
  getDesiganacionesByPage(
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
          (response.content as DesignacionTA[]).forEach((designacionTA) => {
            return designacionTA;
          });
        }),
        map((response: any) => {
          (response.content as DesignacionTA[]).map((designacionTA) => {
            return designacionTA;
          });
          return response;
        })
      );
  }

  //CREAR Carrera SIN FOTO
  crear(DesignacionTA: DesignacionTA): Observable<DesignacionTA> {
    return this.http.post<DesignacionTA>(`${bd_url}/`, DesignacionTA).pipe(
      map((response: any) => response.DesignacionTA as DesignacionTA),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  //EDITAR DESIGNACION_TA
  editar(designacionTA: DesignacionTA, id: number): Observable<DesignacionTA> {
    return this.http.put<DesignacionTA>(`${bd_url}/${id}`, designacionTA).pipe(
      map((response: any) => response.designacionTA as DesignacionTA),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
  //ELIMINAR UNA DESIGNACION_TA
  eliminar(id: number): Observable<DesignacionTA> {
    return this.http.delete<DesignacionTA>(`${bd_url}/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
}
