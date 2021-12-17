import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { Empresa } from 'src/app/models/empresa.model';
import { environment } from "src/environments/environment";
import { catchError, map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
const bd_url = environment.bd_url + "/empresas";
@Injectable({
  providedIn: 'root'
})

export class EmpresaService {

  constructor(private http: HttpClient) {}
  //OBTENER UNA CARRERA POR ID
  getEmpresaById(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${bd_url}/${id}`);
  }

  //CARRERAS SIN PAGINACION
  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${bd_url}/filtrar`);
  }


  //PAGINACION DE CARRERAS
  getEmpresaPage(
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
          (response.content as Empresa[]).forEach((Empresa) => {
            return Empresa;
          });
        }),
        map((response: any) => {
          (response.content as Empresa[]).map((Empresa) => {
            return Empresa;
          });
          return response;
        })
      );
  }

  //CREAR Empresa
  crear(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(`${bd_url}/`, empresa).pipe(
      map((response: any) => response.empresa as Empresa),
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
  editar(empresa: Empresa, id: number): Observable<Empresa> {
    return this.http.put<Empresa>(`${bd_url}/${id}`, empresa).pipe(
      map((response: any) => response.empresa as Empresa),
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
  eliminar(id: number): Observable<Empresa> {
    return this.http.delete<Empresa>(`${bd_url}/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
}
