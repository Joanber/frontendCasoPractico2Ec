import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Docente } from 'src/app/models/docente.model';
import { Persona } from 'src/app/models/persona.model';
import { DocenteService } from 'src/app/services/services.models/docente.service';
import { PersonaService } from 'src/app/services/services.models/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-docente',
  templateUrl: './add-docente.component.html',
  styleUrls: ['./add-docente.component.css']
})
export class AddDocenteComponent implements OnInit {

  autocompleteControl = new FormControl();
  public formSubmitted = false;
  public bd_url = bd_url + "/personas";
  public docente: Docente[] = [];
  public personas: Persona[] = [];
  public docentesFiltrados: Observable<Docente[]>;
  constructor(
    
    private docenteService: DocenteService,
    private personaService: PersonaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private miDatePipe: DatePipe
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarPersona(id));
    this.cargarPersona();
  }

  cargarPersona() {
    this.personaService.getPersonasPage().subscribe((personas) => {
      this.personas = personas;
    });
  }
  guardarDocente(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    else {
      
      this.docenteService.crear(this.docente).subscribe((docentes) => {
        Swal.fire(
          "Nueva Docente",
          `¡${docentes.titulo_docente} creada con exito!`,
          "success"
        );
        this.irListaDocente();
      });
    }
  }

  irListaDocente() {
    this.router.navigateByUrl("/dashboard/docente");
  }

  irListaDocentes() {
    this.router.navigateByUrl("/dashboard/docentes");
  }

  cargarCarrera(id: number) {
    if (!id) {
      return;
    }
    this.carreraService.getCarreraById(id).subscribe((carrera) => {
      if (!carrera) {
        return this.irListaCarreras();
      }
      this.carrera = carrera;
    });
  }
  compararCoordinador(d1: Docente, d2: Docente) {
    if (d1 === undefined && d2 === undefined) {
      return true;
    }
    return d1 == null || d2 == null ? false : d1.id === d2.id;
  }
}