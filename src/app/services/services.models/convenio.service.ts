import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Convenio } from './../../models/convenio';

const url = environment.bd_url + '/convenio';

@Injectable({
  providedIn: 'root'
})

export class ConvenioService {

  constructor(private httpClient: HttpClient) {}

  retrieveConvenios(): Observable<Convenio[]> {
    return this.httpClient.get<Convenio[]>(`${ url }/`);
  }

  retrieveConveniosByPage() {}

  createConvenio(convenio: Convenio): Observable<Convenio> {
    return this.httpClient.post<Convenio>(`${ url }/`, convenio).pipe(
      map((response: any) => response.convenio as Convenio),
      catchError((e) => {
        if (e.status === 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  findConvenioById(id: number) {
    return this.httpClient.get<Convenio>(`${ url }/${ id }`);
  }

  updateConvenio(convenio: Convenio, id: number): Observable<Convenio> {
    return this.httpClient.put<Convenio>(`${ url }/${ id }`, convenio).pipe(
      map((response: any) => response.convenio as Convenio),
      catchError((e) => {
        if (e.status === 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  deleteConvenio(id: number): Observable<Convenio> {
    return this.httpClient.delete<Convenio>(`${ url }/${ id }`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

}
