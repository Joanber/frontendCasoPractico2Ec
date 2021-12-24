import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Docente } from 'src/app/models/docente.model';
import { Empresa } from 'src/app/models/empresa.model';
import { DocenteService } from 'src/app/services/services.models/docente.service';
import { EmpresaPersonalService } from 'src/app/services/services.models/empresa-personal.service';
import { EmpresaService } from 'src/app/services/services.models/empresa.service';
import Swal from 'sweetalert2';
import { environment } from "src/environments/environment";
import { EmpresaPersonal } from 'src/app/models/empresaPersonal.model';
const bd_url = environment.bd_url;

@Component({
  selector: 'app-add-empresa',
  providers: [DatePipe],
  templateUrl: './add-empresa.component.html',
  styleUrls: ['./add-empresa.component.css']
})
export class AddEmpresaComponent implements OnInit {

  autocompleteControl = new FormControl();
  public empresa = new Empresa();
  public formSubmitted = false;
  public bd_url = bd_url + "/personas";
  public empresas: Empresa[] = [];
  public docentes: Docente[] = [];
  public empresapersonal: EmpresaPersonal[] = [];
  public representanteFiltrados: Observable<Empresa[]>;
  constructor(
    private empresaService: EmpresaService,
    private docenteService: DocenteService,
    private empresapersonalService: EmpresaPersonalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private miDatePipe: DatePipe
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarEmpresa(id));
    this.cargarRepresentante();
  }

  cargarRepresentante() {
    this.empresapersonalService.getEmpresaPersonal().subscribe((empresapersonal) => {
      this.empresapersonal = empresapersonal;
    });
  }
  GuardarEmpresa(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    else {
      
      this.empresaService.crear(this.empresa).subscribe((empresa) => {
        Swal.fire(
          "Nueva empresa",
          `¡${empresa.nombre} creada con exito!`,
          "success"
        );
        this.irListaEmpresa();
      });
    }
  }

  irListaEmpresa() {
    this.router.navigateByUrl("/dashboard/empresa");
  }

  cargarEmpresa(id: number) {
    if (!id) {
      return;
    }
    this.empresaService.getEmpresaById(id).subscribe((empresa) => {
      if (!empresa) {
        return this.irListaEmpresa();
      }
      this.empresa = empresa;
    });
  }
  representante(d1: Docente, d2: Docente) {
    if (d1 === undefined && d2 === undefined) {
      return true;
    }
    return d1 == null || d2 == null ? false : d1.id === d2.id;
  }
}
