import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { ActaDR } from "src/app/models/actaDR.model";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
const bd_url = environment.bd_url + "/actasdr";
@Injectable({
  providedIn: "root",
})
export class ActaService {
  getActaPage(
    page: string,
    size: string,
    carreraFiltro: string,
    fecha: string
  ) {
    throw new Error("Method not implemented.");
  }

  constructor(private http: HttpClient) {}

  //ACTAS
  getActas(): Observable<ActaDR[]> {
    return this.http.get<ActaDR[]>(`${bd_url}/filtrar`);
  }
  //ACTAS
  getActasByTAExiste(): Observable<ActaDR[]> {
    return this.http.get<ActaDR[]>(`${bd_url}/actas-ta/filtrar`);
  }

  //PAGINACION DE ACTAS
  getActasPage(
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
          (response.content as ActaDR[]).forEach((acta) => {
            return acta;
          });
        }),
        map((response: any) => {
          (response.content as ActaDR[]).map((acta) => {
            return acta;
          });
          return response;
        })
      );
  }
  //CREAR ACTAS
  crear(acta: ActaDR): Observable<ActaDR> {
    return this.http.post<ActaDR>(`${bd_url}/`, acta).pipe(
      map((response: any) => response.acta as ActaDR),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
  //EDITAR ACTAS
  editar(acta: ActaDR, id: number): Observable<ActaDR> {
    return this.http.put<ActaDR>(`${bd_url}/${id}`, acta).pipe(
      map((response: any) => response.acta as ActaDR),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
  //ELIMINAR UNA ACTA
  eliminar(id: number): Observable<ActaDR> {
    return this.http.delete<ActaDR>(`${bd_url}/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
  //OBTENER UNA ACTA POR ID
  getActaById(id: number): Observable<ActaDR> {
    return this.http.get<ActaDR>(`${bd_url}/${id}`);
  }
  //OBTENER UNA ACTA POR ALUMNO ID
  getActaRDByAlumnoId(id: number): Observable<ActaDR> {
    return this.http.get<ActaDR>(`${bd_url}/alumno/${id}`);
  }
}
