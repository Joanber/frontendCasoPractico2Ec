import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ValidacionSAC } from "src/app/models/validaciones_sac.model";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
const bd_url = environment.bd_url + "/validaciones_sac";

@Injectable({
  providedIn: "root",
})
export class ValidacionesSacService {
  constructor(private http: HttpClient) {}

  //VALIDACIONES_SAC SIN PAGINACION
  getValidaciones(): Observable<ValidacionSAC[]> {
    return this.http.get<ValidacionSAC[]>(`${bd_url}/filtrar`);
  }
  getValidacionSacById(id: number): Observable<ValidacionSAC> {
    return this.http.get<ValidacionSAC>(`${bd_url}/${id}`);
  }
  getValidacionSacByAlumnoId(id: number): Observable<ValidacionSAC> {
    return this.http.get<ValidacionSAC>(`${bd_url}/alumno/${id}`);
  }
  //PAGINACION DE VALIDACIONES_SAC
  getValidacionesSACPage(
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
          (response.content as ValidacionSAC[]).forEach((validacion_sac) => {
            return validacion_sac;
          });
        }),
        map((response: any) => {
          (response.content as ValidacionSAC[]).map((validacion_sac) => {
            return validacion_sac;
          });
          return response;
        })
      );
  }
}
