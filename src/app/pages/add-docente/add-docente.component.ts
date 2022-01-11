import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Docente } from "src/app/models/docente.model";
import { Persona } from "src/app/models/persona.model";
import { DocenteService } from "src/app/services/services.models/docente.service";
import { PersonaService } from "src/app/services/services.models/persona.service";

import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
const bd_url = environment.bd_url;

@Component({
  selector: "app-add-docente",
  templateUrl: "./add-docente.component.html",
  styleUrls: ["./add-docente.component.css"],
})
export class AddDocenteComponent implements OnInit {
  autocompleteControl = new FormControl();
  public formSubmitted = false;
  public docente = new Docente();
  public docentes: Docente[] = [];
  public personas: Persona[] = [];

  public docentesFiltrados: Observable<Docente[]>;
  constructor(
    private docenteService: DocenteService,
    private personaService: PersonaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarDocentes(id));
    this.cargarPersona();
  }

  cargarPersona() {
    this.personaService.getPersonas().subscribe((personas) => {
      this.personas = personas;
    }); 
  }
  

  guardarDocente(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    } 
    if (this.docente.id) {
      this.docenteService
        .editar(this.docente, this.docente.id)
        .subscribe((docente) => {
          Swal.fire(
            "Actualizar Docente",
            `¡${ this.docente.persona.primer_nombre +' '+   docente.persona.primer_apellido} actualizado con exito!`,
            "success"
          );
          this.irListaDocentes();
        });
      }else {
      this.docenteService.crear(this.docente).subscribe((docente) => {
        Swal.fire(
          "Nuevo (a) Docente",
          `¡${this.docente.persona.primer_nombre +' '+   this.docente.persona.primer_apellido} creada con exito!`,
          "success"
        );
        this.irListaDocentes();
      });
    }
  }

  irListaDocentes() {
    this.router.navigateByUrl("/dashboard/docentes");
  }

  cargarDocentes(id: number) {
    if (!id) {
      return;
    }
    this.docenteService.getDocenteById(id).subscribe((docente) => {
      if (!docente) {
        return this.irListaDocentes(); 
      }
      this.docente = docente;
    });
  }
  compararPersona(d1: Persona, d2: Persona) {
    if (d1 === undefined && d2 === undefined) {
      return true;
    }
    return d1 == null || d2 == null ? false : d1.id === d2.id;
  }
  

}
