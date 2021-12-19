import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmpresaPersonal } from 'src/app/models/empresaPersonal.model';
import { Persona } from 'src/app/models/persona.model';
import { PersonaService } from 'src/app/services/services.models/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-empresa-personal',
  templateUrl: './add-empresa-personal.component.html',
  styleUrls: ['./add-empresa-personal.component.css']
})
export class AddEmpresaPersonalComponent implements OnInit {

  autocompleteControl = new FormControl();
  public empresaPersonal= new  EmpresaPersonal();
  public formSubmitted = false;
  public bd_url = bd_url + "/personas";
  public personas: Persona[] = [];
  public docentesFiltrados: Observable<EmpresaPersonal[]>;
  
  constructor(
    private empresaPersonalService: PersonaService,
    private personaService: PersonaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private miDatePipe: DatePipe
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarPersonalEmpresa(id));
    this.cargarPersona();
  }

  cargarPersona() {
    this.personaService.getPersonasPage().subscribe((personas) => {
      this.personas = personas;
    });
  }
  guardarEmpresaPersonal(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    else {
      
      this.empresaPersonalService.crearEmpresaPersonal(this.empresaPersonal).subscribe((empresaPersonal) => {
        Swal.fire(
          "Nueva empresa Personal",
          `¡${empresaPersonal.cargo} creada con exito!`,
          "success"
        );
        this.irListaEmpresaPersonales();
      });
    }
  }

  irListaEmpresaPersonales() {
    this.router.navigateByUrl("/dashboard/empresaPersonal");
  }


  cargarPersonalEmpresa(id: number) {
    if (!id) {
      return;
    }
    this.empresaPersonalService.get(id).subscribe((empresaPersonal) => {
      if (!empresaPersonal) {
        return this.irListaEmpresaPersonales();
      }
      this.empresaPersonal = empresaPersonal;
    });
  }
  compararempresaPersonal(d1: EmpresaPersonal, d2: EmpresaPersonal) {
    if (d1 === undefined && d2 === undefined) {
      return true;
    }
    return d1 == null || d2 == null ? false : d1.id === d2.id;
  }


}