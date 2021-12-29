import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
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
              private router: Router) {


              }

  get formValues() {
    return this.convenioForm.controls;
  }

  carreras: Carrera[] = [];
  empresas: Empresa[] = [];

  carrera = new Carrera();

  convenio = {} as Convenio;
  convenioForm!: FormGroup;

  btnName = 'Guardar';
  alphabeticPattern = '^[a-zA-ZÀ-ÿÑñ ]+( *[a-zA-ZÀ-ÿÑñ]*)*[a-zA-ZÀ-ÿñÑ ]+$';
  matcher = new MyErrorStateMatcher();

  ngAfterViewInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => this.retriveConvenio(id));
  }

  ngOnInit() {
    this.retrieveCarreras();
    this.retrieveEmpresas();
    this.loadForm();
  }

  loadForm() {
    this.convenioForm = this.formbuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(this.alphabeticPattern)]],
      carrera: ['', Validators.required],
      empresa: ['', Validators.required],
      id: []
    });
  }

  retrieveCarreras() {
    this.carreraService.getCarreras().subscribe(c => this.carreras = c);
  }

  retrieveEmpresas() {
    this.empresaServices.getEmpresas().subscribe(e => this.empresas = e);
  }

  onSubmit() {
    console.log('To Submit', this.convenioForm.value);

    if (this.convenioForm.valid && !this.convenio.id) {
      this.convenio = this.convenioForm.value;
      this.convenioService.createConvenio(this.convenio).subscribe({
        next: (convenio) => Swal.fire(
          'Nueva Convenio',
          `¡${ convenio.nombre } creado con exito!`,
          'success'
        ), complete: () => this.returnToList()
        , error: (err) => console.error(err)
      });
    }
    if (this.convenioForm.valid && this.convenio.id) {
      this.convenio = this.convenioForm.value;
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
          this.convenio = convenio;
          this.patchForm(convenio);
        },
        error: () => {
          return this.returnToList();
        }
      });
  }

  patchForm(convenio: Convenio) {
    this.convenioForm.markAllAsTouched();
    this.convenioForm.patchValue({
      id: convenio.id,
      nombre: convenio.nombre,
      carrera: this.carreras.find(() => convenio.carrera !== undefined || convenio.carrera !== null),
      empresa: this.empresas.find(() => convenio.empresa !== undefined || convenio.empresa !== null)
    });

  }
}

// carrera: this.carreras[this.carreras.findInde`1x(carrera => carrera.id === convenio.carrera.id)] ,/
// this.empresas.pipe(map(txs => txs.findIndex(txn => txn.id === convenio.empresa.id))).subscribe(e => this.empresaIndex = e)
// carrera: this.carreras[this.carreras.findInde`1x(carrera => carrera.id === convenio.carrera.id)] ,/
// carrera: this.carreras.filter(carrera => carrera.id = convenio.carrera.id)[0],
// empresa: this.empresas[this.empresas.map((empresa) => empresa.id).indexOf(convenio.empresa.id)],

// getC(c: Carrera) {
//   return new Promise<Carrera>(resolve => {
//     this.carreras.pipe(map(carreras => carreras.find(() => c !== undefined || c !== null)),
//       take(1)
//     )
//       .subscribe(
//         (data: Carrera) => {
//           resolve(data);
//         });
//   });
// }


    // const convenioObj = Object.keys(convenio).filter(c => convenio[c] !== undefined || convenio[c] != null);
    // const newConvenioObject = {};
    // convenioObj.forEach(item => Object.assign(newConvenioObject, {
    //   [item]: convenio[item]
    // }));
    // console.log(newConvenioObject);

    // this.carreras.Where(x => x.Title == title)
    // // this.convenioForm.setValue({
    // //   id: convenio.id,
    // //   nombre: convenio.nombre,
    // //   empresa: this.empresas.find(() => convenio.empresa !== undefined || convenio.empresa !== null),
    // //   // carrera: this.carreras.find(() => convenio.carrera !== undefined || convenio.carrera !== null)
    // // });
    // console.log('empresa', this.empresas.find(() => convenio.empresa !== undefined || convenio.empresa !== null));

    // this.btnName = 'Editar';
    // this.carreras.pipe(map(carreras => carreras.find(() => convenio.carrera !== undefined || convenio.carrera !== null)))
    //   .subscribe(e => this.carrera = e);
