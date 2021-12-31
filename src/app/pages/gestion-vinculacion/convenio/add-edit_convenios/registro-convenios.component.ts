import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Carrera } from 'src/app/models/carrera.model';
import { Empresa } from 'src/app/models/empresa.model';
import { LoaderService } from 'src/app/services/interceptores/loader.service';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { EmpresaService } from 'src/app/services/services.models/empresa.service';
import Swal from 'sweetalert2';
import { Convenio } from './../../../../models/convenio';
import { ConvenioService } from './../../../../services/services.models/convenio.service';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-registro-convenios',
  templateUrl: './registro-convenios.component.html',
  styleUrls: ['./registro-convenios.component.css']
})
export class RegistroConveniosComponent implements OnInit, AfterViewInit {

  constructor(private formbuilder: FormBuilder, private carreraService: CarreraService,
              private empresaServices: EmpresaService, private convenioService: ConvenioService,
              private activatedRoute: ActivatedRoute, public loaderService: LoaderService,
              private router: Router, public dialog: MatDialog) {}

  get formValues() {
    return this.convenioForm.controls;
  }

  carreras$ = new Observable<Carrera[]>();
  empresas$ = new Observable<Empresa[]>();

  convenio = {} as Convenio;
  convenioForm!: FormGroup;

  btnName = 'Guardar';
  alphabeticPattern = '^[a-zA-ZÀ-ÿÑñ ]+( *[a-zA-ZÀ-ÿÑñ]*)*[a-zA-ZÀ-ÿñÑ ]+$';
  matcher = new MyErrorStateMatcher();

  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.retriveConvenio(id));
  }

  ngOnInit() {
    this.loadForm();
    this.retrieveCarreras();
    this.retrieveEmpresas();
  }

  loadForm() {
    if (this.convenio.id) {
      this.patchForm(this.convenio);
      return;
    }
    this.convenioForm = this.formbuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(this.alphabeticPattern)]],
      carrera: ['', Validators.required],
      empresa: ['', Validators.required],
      id: []
    });
  }

  retrieveCarreras() {
    this.carreras$ = this.carreraService.getCarreras();
  }

  retrieveEmpresas() {
    this.empresas$ = this.empresaServices.getEmpresas();
  }

  async createConvenio() {
    this.convenio = this.convenioForm.value;
    this.convenio.carrera = await this.carreras$.pipe(map(carreras => carreras.find(c =>
      c.id === this.convenioForm.value.carrera))).toPromise();
    this.convenio.empresa = await this.empresas$.pipe(map(empresas => empresas.find(e =>
      e.id === this.convenioForm.value.empresa))).toPromise();
  }

  onSubmit() {
    console.log('To Submit', this.convenioForm.value);
    if (this.convenioForm.valid && !this.convenio.id) {
      this.createConvenio().finally(() => {
        this.convenioService.createConvenio(this.convenio).subscribe({
          next: (convenio) => Swal.fire(
            'Nueva Convenio',
            `¡${ convenio.nombre } creado con exito!`,
            'success'
          ), complete: () => this.returnToList()
          , error: (err) => console.error(err)
        });
      });
    }
    if (this.convenioForm.valid && this.convenio.id) {
      this.createConvenio().finally(() => {
        console.warn('To Update', this.convenioForm.value);
        this.convenioService.updateConvenio(this.convenio, this.convenio.id).subscribe({
          next: (convenio) =>
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Actualizar Convenio',
              text: `¡${ convenio.nombre } actualizado con exito!`,
              showConfirmButton: false,
              timer: 1100
            })
          , complete: () => this.returnToList(), error: (err) => console.error(err)
        });
      });
    }
  }

  returnToList() {
    this.router.navigateByUrl('dashboard/convenios');
  }

  retriveConvenio(id: number) {
    if (!id) {
      return;
    }
    this.convenioService.findConvenioById(id).subscribe(
      {
        next: (convenio) => {
          this.patchForm(convenio);
          this.convenio = convenio;
        },
        error: () => {
          return this.returnToList();
        }, complete: () => {
          this.btnName = 'Editar';
          this.convenioForm.markAllAsTouched();
        }
      });
  }

  patchForm(convenio: Convenio) {
    this.convenioForm.patchValue({
      id: convenio.id,
      nombre: convenio.nombre,
      carrera: convenio.carrera.id,
      empresa: convenio.empresa.id
    });
  }
}
