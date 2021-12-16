import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Carrera } from "src/app/models/carrera.model";
import { Docente } from "src/app/models/docente.model";
import { environment } from "src/environments/environment";

import Swal from "sweetalert2";

const bd_url = environment.bd_url + "/carreras";

@Injectable({
  providedIn: "root",
})
export class CarreraService {
  constructor(private http: HttpClient) {}
  //OBTENER UNA CARRERA POR ID
  getCarreraById(id: number): Observable<Carrera> {
    return this.http.get<Carrera>(`${bd_url}/${id}`);
  }

  //CARRERAS SIN PAGINACION
  getCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${bd_url}/filtrar`);
  }


  //PAGINACION DE CARRERAS
  getCarrerasPage(
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
          (response.content as Carrera[]).forEach((Carrera) => {
            return Carrera;
          });
        }),
        map((response: any) => {
          (response.content as Carrera[]).map((Carrera) => {
            return Carrera;
          });
          return response;
        })
      );
  }
  //CREAR Carrera SIN FOTO
  crear(carrera: Carrera): Observable<Carrera> {
    return this.http.post<Carrera>(`${bd_url}/`, carrera).pipe(
      map((response: any) => response.carrera as Carrera),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  //EDITAR CARRERA
  editar(carrera: Carrera, id: number): Observable<Carrera> {
    return this.http.put<Carrera>(`${bd_url}/${id}`, carrera).pipe(
      map((response: any) => response.carrera as Carrera),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
  //ELIMINAR UNA CARRERA
  eliminar(id: number): Observable<Carrera> {
    return this.http.delete<Carrera>(`${bd_url}/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
}
