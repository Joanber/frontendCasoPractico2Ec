import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Seguimiento } from "src/app/models/Seguimiento.model";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
const bd_url = environment.bd_url + "/seguimientos";
@Injectable({
  providedIn: "root",
})
export class SeguimientoService {
  constructor(private http: HttpClient) {}

  //SEGUIMIENTOS
  getSeguimientos(): Observable<Seguimiento[]> {
    return this.http.get<Seguimiento[]>(`${bd_url}/filtrar`);
  }

  //CREAR Seguimiento
  crear(seguimiento: Seguimiento): Observable<Seguimiento> {
    return this.http.post<Seguimiento>(`${bd_url}/`, seguimiento).pipe(
      map((response: any) => response.seguimiento as Seguimiento),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  //EDITAR Seguimiento
  editar(seguimiento: Seguimiento, id: number): Observable<Seguimiento> {
    return this.http.put<Seguimiento>(`${bd_url}/${id}`, seguimiento).pipe(
      map((response: any) => response.seguimiento as Seguimiento),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
  //ELIMINAR UN Seguimiento
  eliminar(id: number): Observable<Seguimiento> {
    return this.http.delete<Seguimiento>(`${bd_url}/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
  //OBTENER UN Seguimiento POR ID
  getSeguimientoById(id: number): Observable<Seguimiento> {
    return this.http.get<Seguimiento>(`${bd_url}/${id}`);
  }
}
