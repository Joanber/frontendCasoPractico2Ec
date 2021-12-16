import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Empresa } from 'src/app/models/empresa.model';
import { environment } from 'src/environments/environment';
const bd_url = environment.bd_url + "/empresas";
@Injectable({
  providedIn: 'root'
})

export class EmpresaService {

  constructor(private http: HttpClient) {}

  getEmpresasByNombre(busqueda: string): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${bd_url}/filtrar/${busqueda}`);
  }
  getEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${bd_url}/filtrar/`);
  }

}
