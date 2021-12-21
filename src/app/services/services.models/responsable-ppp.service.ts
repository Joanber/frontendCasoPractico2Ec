import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { ResponsablePPP } from "src/app/models/responsablePPP.model";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
const bd_url = environment.bd_url + "/responsablesPPP";
@Injectable({
  providedIn: "root",
})
export class ResponsablePPPService {
  constructor(private http: HttpClient) {}

  //OBTENER UNA ResponsablePPP POR ID
  getResponsablePPPById(id: number): Observable<ResponsablePPP> {
    return this.http.get<ResponsablePPP>(`${bd_url}/${id}`);
  }

  //CARRERAS SIN PAGINACION
  getResponsablePPP(): Observable<ResponsablePPP[]> {
    return this.http.get<ResponsablePPP[]>(`${bd_url}/filtrar`);
  }

  //PAGINACION DE CARRERAS
  getResponsablePPPPage(
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
          (response.content as ResponsablePPP[]).forEach((ResponsablePPP) => {
            return ResponsablePPP;
          });
        }),
        map((response: any) => {
          (response.content as ResponsablePPP[]).map((ResponsablePPP) => {
            return ResponsablePPP;
          });
          return response;
        })
      );
  }

  //CREAR ResponsablePPP
  crear(responsablePPP: ResponsablePPP): Observable<ResponsablePPP> {
    return this.http.post<ResponsablePPP>(`${bd_url}/`, responsablePPP).pipe(
      map((response: any) => response.responsablePPP as ResponsablePPP),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  //EDITAR responsablePPP
  editar(responsablePPP: ResponsablePPP, id: number): Observable<ResponsablePPP> {
    return this.http.put<ResponsablePPP>(`${bd_url}/${id}`, responsablePPP).pipe(
      map((response: any) => response.responsablePPP as ResponsablePPP),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
  //ELIMINAR UN Docente
  eliminar(id: number): Observable<ResponsablePPP> {
    return this.http.delete<ResponsablePPP>(`${bd_url}/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
}

