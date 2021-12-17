import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Carrera } from 'src/app/models/carrera.model';
import { Empresa } from 'src/app/models/empresa.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
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
  selector: 'app-registro-convenios',
  templateUrl: './registro-convenios.component.html',
  styleUrls: ['./registro-convenios.component.css']
})
export class RegistroConveniosComponent implements OnInit {
  constructor(private formbuilder: FormBuilder, private carreraService: CarreraService,
    private convenioService: ConvenioService, private activatedRoute: ActivatedRoute,
    private router: Router) {}

  empresa: Empresa[] = [

  ];
// {
//   id: 1, nombre: 'Empresa pa empresa', ruc: 'RUC0123423234',
//     direccion: 'Av. Américas y 1º de mayo',
//       telefono: '0980386885',
//         empresaPersonal: new EmpresaPersonal{
//     id: 1,
//       cargo: 'jefe',
//         sueldo: '1234',
//           persona: new Persona {

//       id: 1,
//         identificacion: '0105661524',
//           primer_nombre: 'string',
//             segundo_nombre: 'string',
//               primer_apellido: 'string',
//                 segundo_apellido: 'string',
//                   email: 'string',
//                     celular: 'string',
//                       direccion: 'string',
//                         fecha_nacimiento: 'string',
//                           genero: 'string',
//                             fotoHashCode: 1,
//       },
//   }
// }
  carreras: Carrera[] = [];
  convenio = {} as Convenio;
  convenioForm!: FormGroup;
  alphabeticPattern = '^[a-zA-ZÀ-ÿÑñ ]+( *[a-zA-ZÀ-ÿÑñ]*)*[a-zA-ZÀ-ÿñÑ ]+$';
  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.loadForm();
    this.retrieveCarreras();
    this.activatedRoute.params.subscribe(({ id }) => this.retriveConvenio(id));

  }

  loadForm() {
    this.convenioForm = this.formbuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(this.alphabeticPattern)]],
      tipo: ['', [Validators.required, Validators.pattern(this.alphabeticPattern)]],
      carrera: [Carrera, Validators.required],
      empresa: ['', Validators.required],
    });
  }

  retrieveCarreras() {
    this.carreraService.getCarrerasPage('0', '10', '').subscribe({
      next: (carrera) => this.carreras = carrera.content
    }
    );
  }

  get formValues() {
    return this.convenioForm.controls;
  }

  onSubmit() {
    console.warn(this.convenioForm.value);

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
    } else {
      this.convenioService.updateConvenio(this.convenio, this.convenio.id).subscribe({
        next: (convenio) =>
          Swal.fire(
            'Actualizar Convenio',
            `¡${ convenio.nombre } actualizado con exito!`,
            'success'
          )
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
        next: (convenio) => this.convenio = convenio,
        error: () => {
          return this.returnToList();
        }
        , complete: () => this.patchForm(this.convenio)
      });
  }

  patchForm(convenio: Convenio) {
    this.convenioForm.patchValue({
      nombre: convenio.nombre,
      tipo: convenio.tipo,
      empresa: this.empresa.filter(empresa => empresa.id = convenio.empresa.id)[0],
      carrera: this.carreras.filter(carrera => carrera.id = convenio.carrera.id)[0],
    });
  }
}
