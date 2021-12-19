import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Docente } from "src/app/models/docente.model";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
const bd_url = environment.bd_url + "/docentes";

@Injectable({
  providedIn: "root",
})
export class DocenteService {
  constructor(private http: HttpClient) {}

  //OBTENER UNA Docente POR ID
  getDocenteById(id: number): Observable<Docente> {
    return this.http.get<Docente>(`${bd_url}/${id}`);
  }

  //CARRERAS SIN PAGINACION
  getDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(`${bd_url}/filtrar`);
  }

  //PAGINACION DE CARRERAS
  getDocentesPage(
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
          (response.content as Docente[]).forEach((Docente) => {
            return Docente;
          });
        }),
        map((response: any) => {
          (response.content as Docente[]).map((Docente) => {
            return Docente;
          });
          return response;
        })
      );
  }

  //CREAR Docente
  crear(docente: Docente): Observable<Docente> {
    return this.http.post<Docente>(`${bd_url}/`, docente).pipe(
      map((response: any) => response.docente as Docente),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  //EDITAR Docente
  editar(docente: Docente, id: number): Observable<Docente> {
    return this.http.put<Docente>(`${bd_url}/${id}`, docente).pipe(
      map((response: any) => response.docente as Docente),
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
  eliminar(id: number): Observable<Docente> {
    return this.http.delete<Docente>(`${bd_url}/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
}
