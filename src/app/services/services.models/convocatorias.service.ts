import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { ConvocatoriaComponent } from 'src/app/pages/add-convocatoria/convocatoria.component';
import { environment } from 'src/environments/environment';
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
}
