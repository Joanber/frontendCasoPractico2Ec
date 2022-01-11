import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Actividadesvi } from "src/app/models/actividadesvi.model";
import { Visita } from "src/app/models/visita.model";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

const bd_url = environment.bd_url + "/visitas";
@Injectable({
  providedIn: "root",
})
export class VisitaService {
  constructor(private http: HttpClient) {}
  //OBTENER UNA Visita POR ID
  getVisitaById(id: number): Observable<Visita> {
    return this.http.get<Visita>(`${bd_url}/${id}`);
  }

  getVisitasPage(
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
          (response.content as Visita[]).forEach((visita) => {
            return visita;
          });
        }),
        map((response: any) => {
          (response.content as Visita[]).map((visita) => {
            return visita;
          });
          return response;
        })
      );
  }
  //VisitaS SIN PAGINACION
  getVisitas(): Observable<Visita[]> {
    return this.http.get<Visita[]>(`${bd_url}/filtrar`);
  }
  getActividadesInformesVisitas(): Observable<Actividadesvi[]> {
    return this.http.get<Actividadesvi[]>(
      `${bd_url}/filtrar-actividades-visitas`
    );
  }

  //CREAR Visita SIN FOTO
  crear(visita: Visita): Observable<Visita> {
    return this.http.post<Visita>(`${bd_url}/`, visita).pipe(
      map((response: any) => response.visita as Visita),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  //EDITAR Visita
  editar(visita: Visita, id: number): Observable<Visita> {
    return this.http.put<Visita>(`${bd_url}/${id}`, visita).pipe(
      map((response: any) => response.visita as Visita),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
  //ELIMINAR UNA Visita
  eliminar(id: number): Observable<Visita> {
    return this.http.delete<Visita>(`${bd_url}/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
}
