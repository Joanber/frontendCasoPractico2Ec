import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Persona } from "src/app/models/persona.model";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
const bd_url = environment.bd_url + "/personas";
@Injectable({
  providedIn: "root",
})
export class PersonaService {
  constructor(private http: HttpClient) {}

  //OBTENER UNA PERSONA POR ID
  getPersonaById(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${bd_url}/${id}`);
  }

  //PAGINACION DE PERSONAS
  getPersonasPage(
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
          (response.content as Persona[]).forEach((persona) => {
            return persona;
          });
        }),
        map((response: any) => {
          (response.content as Persona[]).map((persona) => {
            return persona;
          });
          return response;
        })
      );
  }
  //CREAR PERSONA SIN FOTO
  crearSinFoto(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${bd_url}/`, persona).pipe(
      map((response: any) => response.persona as Persona),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
  //CREAR PERSONA CON FOTO
  crearConFoto(persona: Persona, archivo: File): Observable<Persona> {
    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("identificacion", persona.identificacion);
    formData.append("primer_nombre", persona.primer_nombre);
    formData.append("segundo_nombre", persona.segundo_nombre);
    formData.append("primer_apellido", persona.primer_apellido);
    formData.append("segundo_apellido", persona.segundo_apellido);
    formData.append("celular", persona.celular);
    formData.append("direccion", persona.direccion);
    formData.append("fecha_nacimiento", persona.fecha_nacimiento);
    formData.append("email", persona.email);
    formData.append("genero", persona.genero);
    return this.http.post<Persona>(bd_url + "/crear-con-foto", formData).pipe(
      map((response: any) => response.persona as Persona),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  //EDITAR PERSONA SIN FOTO
  editarSinFoto(persona: Persona, id: number): Observable<Persona> {
    return this.http.put<Persona>(`${bd_url}/${id}`, persona).pipe(
      map((response: any) => response.persona as Persona),
      catchError((e) => {
        if (e.status == 400) {
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
  //EDITAR PERSONA CON LA FOTO
  editarConFoto(
    persona: Persona,
    archivo: File,
    id: number
  ): Observable<Persona> {
    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("identificacion", persona.identificacion);
    formData.append("primer_nombre", persona.primer_nombre);
    formData.append("segundo_nombre", persona.segundo_nombre);
    formData.append("primer_apellido", persona.primer_apellido);
    formData.append("segundo_apellido", persona.segundo_apellido);
    formData.append("celular", persona.celular);
    formData.append("direccion", persona.direccion);
    formData.append("fecha_nacimiento", persona.fecha_nacimiento);
    formData.append("email", persona.email);
    formData.append("genero", persona.genero);
    return this.http
      .put<Persona>(`${bd_url}/editar-con-foto/${id}`, formData)
      .pipe(
        map((response: any) => response.persona as Persona),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(e);
          }
          Swal.fire(e.error.mensaje, e.error.error, "error");
          return throwError(e);
        })
      );
  }
  //ELIMINAR UNA PERSONA
  eliminar(id: number): Observable<Persona> {
    return this.http.delete<Persona>(`${bd_url}/${id}`).pipe(
      catchError((e) => {
        Swal.fire(e.error.mensaje, e.error.error, "error");
        return throwError(e);
      })
    );
  }
}
