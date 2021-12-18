import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { EmpresaPersonal } from 'src/app/models/empresaPersonal.model';

import { environment } from "src/environments/environment";

import Swal from "sweetalert2";

const bd_url = environment.bd_url + "/empresas_personales";

@Injectable({
  providedIn: 'root'
})
export class EmpresaPersonalService {
  constructor(private http: HttpClient) {}

 //OBTENER UNA EmpresaPersonal POR ID
 getById(id: number): Observable<EmpresaPersonal> {
  return this.http.get<EmpresaPersonal>(`${bd_url}/${id}`);
}

//CARRERAS SIN PAGINACION
getEmpresaPersonal(): Observable<EmpresaPersonal[]> {
  return this.http.get<EmpresaPersonal[]>(`${bd_url}/filtrar`);
}

//PAGINACION DE CARRERAS
getEmpresaPersonalPage(
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
        (response.content as EmpresaPersonal[]).forEach((EmpresaPersonal) => {
          return EmpresaPersonal;
        });
      }),
      map((response: any) => {
        (response.content as EmpresaPersonal[]).map((EmpresaPersonal) => {
          return EmpresaPersonal;
        });
        return response;
      })
    );
}

//CREAR EmpresaPersonal
crear(empresaPersonal: EmpresaPersonal): Observable<EmpresaPersonal> {
  return this.http.post<EmpresaPersonal>(`${bd_url}/`, empresaPersonal).pipe(
    map((response: any) => response.empresaPersonal as EmpresaPersonal),
    catchError((e) => {
      if (e.status == 400) {
        return throwError(e);
      }
      Swal.fire(e.error.mensaje, e.error.error, "error");
      return throwError(e);
    })
  );
}

//EDITAR EmpresaPersonal
editar(empresaPersonal: EmpresaPersonal, id: number): Observable<EmpresaPersonal> {
  return this.http.put<EmpresaPersonal>(`${bd_url}/${id}`, empresaPersonal).pipe(
    map((response: any) => response.empresaPersonal as EmpresaPersonal),
    catchError((e) => {
      if (e.status == 400) {
        return throwError(e);
      }
      Swal.fire(e.error.mensaje, e.error.error, "error");
      return throwError(e);
    })
  );
}
//ELIMINAR UN EmpresaPersonal
eliminar(id: number): Observable<EmpresaPersonal> {
  return this.http.delete<EmpresaPersonal>(`${bd_url}/${id}`).pipe(
    catchError((e) => {
      Swal.fire(e.error.mensaje, e.error.error, "error");
      return throwError(e);
    })
  );
}
}
