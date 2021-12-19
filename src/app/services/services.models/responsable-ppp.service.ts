import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ResponsablePPP } from "src/app/models/responsablePPP.model";
import { environment } from "src/environments/environment";
const bd_url = environment.bd_url + "/responsablesPPP";
@Injectable({
  providedIn: "root",
})
export class ResponsablePPPService {
  constructor(private http: HttpClient) {}

  //RESPONSABLES PPP SIN PAGINACION
  getResponsablesPPP(): Observable<ResponsablePPP[]> {
    return this.http.get<ResponsablePPP[]>(`${bd_url}/filtrar`);
  }
}
