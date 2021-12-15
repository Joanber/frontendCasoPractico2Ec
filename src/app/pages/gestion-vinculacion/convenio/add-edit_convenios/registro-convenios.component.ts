import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { Carrera } from 'src/app/models/carrera.model';
import { Empresa } from 'src/app/models/empresa.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
interface Animal {
  name: string;
  sound: string;
}
@Component({
  selector: 'app-registro-convenios',
  templateUrl: './registro-convenios.component.html',
  styleUrls: ['./registro-convenios.component.css']
})
export class RegistroConveniosComponent implements OnInit {
  constructor(private formbuilder: FormBuilder, private carreraService: CarreraService) {}

  empresa: Empresa[] = [
    {
      id: 1, nombre: 'Empresa pa empresa', ruc: 'RUC0123423234',
      direccion: 'Av. Américas y 1º de mayo',
      telefono: '0980386885',
      representante: 'Manolo pesantez', }
  ];

  public carreras: Carrera[] = [];

  convenioForm: FormGroup;
  alphabeticPattern = '^[a-zA-ZÀ-ÿÑñ ]+( *[a-zA-ZÀ-ÿÑñ]*)*[a-zA-ZÀ-ÿñÑ ]+$';
  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.loadForm();
    this.retrieveCarreras();
  }

  loadForm() {
    this.convenioForm = this.formbuilder.group({
      nombreConvenio: ['', [Validators.required, Validators.pattern(this.alphabeticPattern)]],
      tipoConvenio: ['', [Validators.required, Validators.pattern(this.alphabeticPattern)]],
      carrera: ['', Validators.required],
      empresa: [''],
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
  }

}
