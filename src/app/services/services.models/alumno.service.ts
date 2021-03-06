import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Alumno } from "src/app/models/alumno.model";
import { environment } from "src/environments/environment";
const url = environment.bd_url + "/alumnos";
@Injectable({
  providedIn: "root",
})
export class AlumnoService {
  constructor(private httpClient: HttpClient) {}

  getAlumnos(): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(`${url}/filtrar`);
  }

  getAlumnosTAandTEtrue(): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(`${url}/filtrar-estado-true`);
  }

  getById(id: number): Observable<Alumno> {
    return this.httpClient.get<Alumno>(`${url}/${id}`);
  }
  getAlumnoByPersonaId(id: number): Observable<Alumno> {
    return this.httpClient.get<Alumno>(`${url}/persona/${id}`);
  }
}
