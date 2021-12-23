import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SolicitudAlumno } from 'src/app/models/solicitudAlumno.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
const bd_url = environment.bd_url + "/solicitudes_alumnos";
@Injectable({
  providedIn: 'root'
})

export class SolicitudAlumnoService {



  constructor(private http: HttpClient) {}

  //SOLICITUDES SOLICITUD ALUMNOS
  getSolicitudesAlumnos(): Observable<SolicitudAlumno[]> {
    return this.http.get<SolicitudAlumno[]>(`${bd_url}/filtrar`);
  }

  //PAGINACION DE SOLICITUD ALUMNOS
  getSolicitudesAlumnoPage(
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
          (response.content as SolicitudAlumno[]).forEach(
            (solicitudAlumno) => {
              return solicitudAlumno;
            }
          );
        }),
        map((response: any) => {
          (response.content as SolicitudAlumno[]).map((solicitudAlumno) => {
            return solicitudAlumno;
          });
          return response;
        })
      );
  }

  //CREAR SOLICITUD ALUMNOS
  crear(solicitudAlumno: SolicitudAlumno): Observable<SolicitudAlumno> {
    return this.http
      .post<SolicitudAlumno>(`${bd_url}/`, solicitudAlumno)
      .pipe(
        map((response: any) => response.solicitudAlumno as SolicitudAlumno),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, "error");
          return throwError(e);
        })
      );
  }
  //EDITAR SOLICITUD ALUMNOS
  editar(
    solicitudAlumno: SolicitudAlumno,
    id: number
  ): Observable<SolicitudAlumno> {
    return this.http
      .put<SolicitudAlumno>(`${bd_url}/${id}`, solicitudAlumno)
      .pipe(
        map((response: any) => response.solicitudAlumno as SolicitudAlumno),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, "error");
          return throwError(e);
        })
      );
  }
  //ELIMINAR UNA SOLICITUD ALUMNOS
    eliminar(id: number): Observable<SolicitudAlumno> {
    return this.http.delete<SolicitudAlumno>(`${bd_url}/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  //OBTENER UNA SOLICITUD Alumno POR ID
  getSolicitudAlumnoById(id: number): Observable<SolicitudAlumno> {
    return this.http.get<SolicitudAlumno>(`${bd_url}/${id}`);
  }
}
