import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { ConvocatoriaComponent } from 'src/app/pages/add-convocatoria/convocatoria.component';
import { environment } from 'src/environments/environment';
import Swal from "sweetalert2";
const bd_url = environment.bd_url + "/carreras";
@Injectable({

  providedIn: 'root'
})
export class ConvocatoriasService {

  constructor(private http: HttpClient) { }

   //CONVOCATORIAS
   getConvocatorias(): Observable<Convocatoria[]> {
    return this.http.get<Convocatoria[]>(`${bd_url}/filtrar`);
  }


  //CREAR Carrera SIN FOTO
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
}
