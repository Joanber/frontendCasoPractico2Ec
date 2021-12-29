import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DesignacionTA } from 'src/app/models/designacionta.model';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
const bd_url = environment.bd_url + "/designaciones_ta";
@Injectable({
  providedIn: 'root'
})
export class DesignacionTAService {
  constructor(private http: HttpClient) {}

  //OBTENER UNA DESIGNACION_TA POR ID
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

  //CREAR DESIGNACION TA
  crear(designacionTA: DesignacionTA): Observable<DesignacionTA> {
    return this.http.post<DesignacionTA>(`${bd_url}/`, designacionTA).pipe(
      map((response: any) => response.designacionTE as DesignacionTA),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  //EDITAR DESIGNACION TA
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
  //ELIMINAR DESIGNACION TA
  eliminar(id: number): Observable<DesignacionTA> {
    return this.http.delete<DesignacionTA>(`${bd_url}/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
}
