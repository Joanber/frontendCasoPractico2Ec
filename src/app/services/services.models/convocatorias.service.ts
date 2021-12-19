import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Convocatoria } from "src/app/models/convocatoria.model";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
const bd_url = environment.bd_url + "/convocatorias";
@Injectable({
  providedIn: "root",
})
export class ConvocatoriasService {
  constructor(private http: HttpClient) {}

  //CONVOCATORIAS
  getConvocatorias(): Observable<Convocatoria[]> {
    return this.http.get<Convocatoria[]>(`${bd_url}/filtrar`);
  }

  //PAGINACION DE CONVOCATORIAS
  getConvocatoriasPage(
    page: string,
    size: string,
    busqueda: string,
    fecha: string
  ): Observable<any> {
    return this.http
      .get(
        `${bd_url}/page?page=${page}&size=${size}&busqueda=${
          busqueda || ""
        }&date=${fecha || ""}`
      )
      .pipe(
        tap((response: any) => {
          (response.content as Convocatoria[]).forEach((convocatoria) => {
            return convocatoria;
          });
        }),
        map((response: any) => {
          (response.content as Convocatoria[]).map((convocatoria) => {
            return convocatoria;
          });
          return response;
        })
      );
  }

  //CREAR convocatoria
  crear(convocatoria: Convocatoria): Observable<Convocatoria> {
    return this.http.post<Convocatoria>(`${bd_url}/`, convocatoria).pipe(
      map((response: any) => response.carrera as Convocatoria),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
  //EDITAR CONVOCATORIA
  editar(convocatoria: Convocatoria, id: number): Observable<Convocatoria> {
    return this.http.put<Convocatoria>(`${bd_url}/${id}`, convocatoria).pipe(
      map((response: any) => response.convocatoria as Convocatoria),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
  //ELIMINAR UNA CONVOCATORIA
  eliminar(id: number): Observable<Convocatoria> {
    return this.http.delete<Convocatoria>(`${bd_url}/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
  //OBTENER UNA CONVOCATORIA POR ID
  getConvocatoriaById(id: number): Observable<Convocatoria> {
    return this.http.get<Convocatoria>(`${bd_url}/${id}`);
  }
}
