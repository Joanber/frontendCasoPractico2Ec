import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Carrera } from 'src/app/models/carrera.model';
import { Docente } from 'src/app/models/docente.model';
import { Empresa } from 'src/app/models/empresa.model';
import { Persona } from 'src/app/models/persona.model';
import { ResponsablePPP } from 'src/app/models/responsablePPP.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { DocenteService } from 'src/app/services/services.models/docente.service';
import { PersonaService } from 'src/app/services/services.models/persona.service';
import { ResponsablePPPService } from 'src/app/services/services.models/responsable-ppp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-responsable-ppp',
  providers: [DatePipe],
  templateUrl: './add-responsable-ppp.component.html',
  styleUrls: ['./add-responsable-ppp.component.css']
})
export class AddResponsablePPPComponent implements OnInit {
  autocompleteControl = new FormControl();
  public formSubmitted = false;
  public responsableppp= new ResponsablePPP() ;
  public responsablesPPP: ResponsablePPP[] = [];
  public docentes: Docente[] = [];
  public ResponsablePPPFiltrados: Observable<ResponsablePPP[]>;
  public docentesFiltrados: Observable<Docente[]>;
  public empresaFiltrados: Observable<Empresa[]>;
  constructor(
    private responsableService: ResponsablePPPService,
    private docenteService: DocenteService,
    private carreraService: CarreraService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private miDatePipe: DatePipe
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarResponsablePPP(id));
    this.cargarDocentes();
  }

  cargarDocentes() {
    this.docenteService.getDocentes().subscribe((docentes) => {
      this.docentes = docentes;
    });
  }

  guardarResponsable(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    if (this.responsableppp.id) {
      this.responsableService.editar(this.responsableppp, this.responsableppp.id)
        .subscribe((responsableppp) => {
          Swal.fire(
            "Actualizar Carrera",
            `¡${responsableppp.carrera.nombre} actualizada con exito!`,
            "success"
          );
          this.irListaResponsablePPP();
        });

    }else {
      
      this.responsableService.crear(this.responsableppp).subscribe((responsableppp) => {
        Swal.fire(
          "Nuevo (a) responsablePPP",
          `¡${responsableppp.docente.persona.primer_nombre} creada con exito!`,
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
    this.responsableService.getResponsablePPPById(id).subscribe((responsableppp) => {
      if (!responsableppp) {
        return this.irListaResponsablePPP();
      }
      this.responsableppp = responsableppp;
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

