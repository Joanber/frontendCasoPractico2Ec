import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpresaPersonal } from 'src/app/models/empresaPersonal.model';

import { environment } from "src/environments/environment";

import Swal from "sweetalert2";

const bd_url = environment.bd_url + "/carreras";

@Injectable({
  providedIn: 'root'
})
export class EmpresaPersonalService {
  constructor(private http: HttpClient) {}

  //OBTENER UNA EmpresaPersonal POR ID
  getDocenteById(id: number): Observable<EmpresaPersonal> {
    return this.http.get<EmpresaPersonal>(`${bd_url}/${id}`);
  }

  //CARRERAS SIN PAGINACION
  getEmpresaPersonal(): Observable<EmpresaPersonal[]> {
    return this.http.get<EmpresaPersonal[]>(`${bd_url}/filtrar`);
  }
}
