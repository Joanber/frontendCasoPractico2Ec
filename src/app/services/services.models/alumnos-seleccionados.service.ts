import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Alumno } from "src/app/models/alumno.model";
import { environment } from "src/environments/environment";
const url = environment.bd_url + "/alumnos";

@Injectable({
  providedIn: 'root'
})
export class AlumnosSeleccionadosService {

  constructor() { }

}
