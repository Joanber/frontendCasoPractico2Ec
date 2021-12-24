import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Carrera } from 'src/app/models/carrera.model';
import { Docente } from 'src/app/models/docente.model';
import { Persona } from 'src/app/models/persona.model';
import { ResponsablePPP } from 'src/app/models/responsablePPP.model';
import { DocenteService } from 'src/app/services/services.models/docente.service';
import { PersonaService } from 'src/app/services/services.models/persona.service';
import { ResponsablePPPService } from 'src/app/services/services.models/responsable-ppp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-responsable-ppp',
  templateUrl: './add-responsable-ppp.component.html',
  styleUrls: ['./add-responsable-ppp.component.css']
})
export class AddResponsablePPPComponent implements OnInit {

  autocompleteControl = new FormControl();
  public formSubmitted = false;
  public responsablePPP= new ResponsablePPP() ;
  public responsablesPPP: ResponsablePPP[] = [];
  public personas: Persona[] = [];
  public ResponsablePPPFiltrados: Observable<ResponsablePPP[]>;
  constructor(
    private responsabelService: ResponsablePPPService,
    private docenteService: DocenteService,
    private personaService: PersonaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private miDatePipe: DatePipe
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarResponsablePPP(id));
    this.cargarPersona();
  }

  cargarPersona() {
    this.personaService.getPersonas().subscribe((personas) => {
      this.personas = personas;
    });
  }
  guardarResponsable(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    else {
      
      this.responsabelService.crear(this.responsablePPP).subscribe((responsablePPP) => {
        Swal.fire(
          "Nueva responsablePPP",
          `¡${responsablePPP.carrera} creada con exito!`,
          "success"
        );
        this.irListaResponsablePPP();
      });
    }
  }


  irListaResponsablePPP() {
    this.router.navigateByUrl("/dashboard/responsablePPP");
  }

 
  

  cargarResponsablePPP(id: number) {
    if (!id) {
      return;
    }
    this.responsabelService.getResponsablePPPById(id).subscribe((responsablePPP) => {
      if (!responsablePPP) {
        return this.irListaResponsablePPP();
      }
      this.responsablePPP = responsablePPP;
    });
  }
  compararResponsable(d1: ResponsablePPP, d2: ResponsablePPP) {
    if (d1 === undefined && d2 === undefined) {
      return true;
    }
    return d1 == null || d2 == null ? false : d1.id === d2.id;
  }

 
  compararDocente(d1: Docente, d2: Docente) {
    if (d1 === undefined && d2 === undefined) {
      return true;
    }
    return d1 == null || d2 == null ? false : d1.id === d2.id;
  }

  compararCarrera(d1: Carrera, d2: Carrera) {
    if (d1 === undefined && d2 === undefined) {
      return true;
    }
    return d1 == null || d2 == null ? false : d1.id === d2.id;
  }


}

