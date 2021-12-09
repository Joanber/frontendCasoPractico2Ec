import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Docente } from "src/app/models/docente.model";
import { environment } from "src/environments/environment";
const bd_url = environment.bd_url + "/docentes";
@Injectable({
  providedIn: "root",
})
export class DocenteService {
  constructor(private http: HttpClient) {}

  getDocentesByNombre(busqueda: string): Observable<Docente[]> {
    return this.http.get<Docente[]>(`${bd_url}/filtrar/${busqueda}`);
  }
  getDocentes(): Observable<Docente[]> {
    return this.http.get<Docente[]>(`${bd_url}/filtrar/`);
  }
}
