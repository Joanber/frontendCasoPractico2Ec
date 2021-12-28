import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { DesignacionTE } from "src/app/models/designacionte.model";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

const bd_url = environment.bd_url + "/designaciones_te";
@Injectable({
  providedIn: "root",
})
export class DesignacionTEService {
  constructor(private http: HttpClient) {}

  //OBTENER UNA DESIGNACION_TE POR ID
  getDesignacionTEById(id: number): Observable<DesignacionTE> {
    return this.http.get<DesignacionTE>(`${bd_url}/${id}`);
  }
  getDesignacionTEByAlumnoId(id: number): Observable<DesignacionTE> {
    return this.http.get<DesignacionTE>(`${bd_url}/alumno/${id}`);
  }

  //DESIGNACION_TE SIN PAGINACION
  getDesiganacionesTE(): Observable<DesignacionTE[]> {
    return this.http.get<DesignacionTE[]>(`${bd_url}/filtrar`);
  }

  //CREAR Carrera SIN FOTO
  crear(designacionTE: DesignacionTE): Observable<DesignacionTE> {
    return this.http.post<DesignacionTE>(`${bd_url}/`, designacionTE).pipe(
      map((response: any) => response.designacionTE as DesignacionTE),
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
  editar(designacionTE: DesignacionTE, id: number): Observable<DesignacionTE> {
    return this.http.put<DesignacionTE>(`${bd_url}/${id}`, designacionTE).pipe(
      map((response: any) => response.designacionTE as DesignacionTE),
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
  eliminar(id: number): Observable<DesignacionTE> {
    return this.http.delete<DesignacionTE>(`${bd_url}/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
}
