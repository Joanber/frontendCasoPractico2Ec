import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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
  styleUrls: ['./registro-convenios.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ]
})
export class RegistroConveniosComponent implements OnInit, AfterViewInit {
  constructor(private formbuilder: FormBuilder, private carreraService: CarreraService,
    private empresaServices: EmpresaService, private convenioService: ConvenioService,
    private activatedRoute: ActivatedRoute, public loaderService: LoaderService,
    private router: Router, public dialog: MatDialog, private _formBuilder: FormBuilder) {}

  get formValues() {
    return this.convenioForm.controls;
  }
  get firstStepFormGroup() {
    return this.firstFormGroup.controls;
  }

  // forms Array para actividades
  get formEmpresa() {
    return this.secondFormGroup.controls;
  }

  get formArr() {
    return this.secondFormGroup.get('actividadEconomica') as FormArray;
  }
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  nombreInformePrefix = 'SIES-ITS-ISTA';
  fechaInformeSubfix = new Date().getFullYear();
  today = new Date();
  selectNaturalezaEmpresa: string;
  naturalezaEmpresa: string[] = ['Pública', 'Privada', 'Mixta'];
  // public secondFormGroup: FormGroup;
  criteriosGenerales: any[];

  carreras$ = new Observable<Carrera[]>();
  empresas$ = new Observable<Empresa[]>();

  convenio = {} as Convenio;
  convenioForm!: FormGroup;
  index = 0;
  btnName = 'Guardar';
  alphabeticPattern = '^[a-zA-ZÀ-ÿÑñ ]+( *[a-zA-ZÀ-ÿÑñ]*)*[a-zA-ZÀ-ÿñÑ ]+$';
  matcher = new MyErrorStateMatcher();
  obligaciones: any[];

  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.retriveConvenio(id));
  }

  ngOnInit() {
    this.loadForm();
    this.retrieveCarreras();
    this.retrieveEmpresas();
    this.formSteps();
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

  actividadesControls(i: number) {
    return this.formArr.controls[i][' controls '];
  }

  formSteps() {
    this.firstFormGroup = this._formBuilder.group({
      numInforme: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('[0-9]*')]],
      nombreIST: ['INSTITUTO SUPERIOR TECNOLÓGICO DEL AZUAY', Validators.pattern(this.alphabeticPattern)],
      fecha: [new Date().toISOString(), Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      empresa: ['', Validators.required],
      personaAutorizada: ['', Validators.required],
      naturaleza: ['', Validators.required],
      actividadEconomica: this._formBuilder.array([this.initItemRows()])
    });
  }

  initItemRows() {
    return this._formBuilder.group({
      codigo: ['', Validators.required],
      actividad: ['', Validators.required]
    });
  }

  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  openCriteriosGenerales() {
    this.criteriosGenerales = [
      {
        critGen: [{
          crit: 'Objeto.',
          value: 'Viabilizar las prácticas pre profesionales a los estudiantes de la carrera de Tecnología Superior en Desarrollo de Software, ofertada(s) por el INSTITUTO TECNOLÓGICO SUPERIOR DEL AZUAY, en las instalaciones de la ENTIDAD RECEPTORA COOPERATIVA DE AHORRO Y CRÉDITO ERCO LTDA. de conformidad a lo determinado en el artículo 87 de la Ley Orgánica de Educación Superior, con la finalidad de que cumplan con el requisito de titulación exigido por la normativa de educación superior vigente.'
        },
        {
          crit: 'Ley Orgánica de Educación Superior - LOES.',
          value: 'Art. 87.- Requisitos previos a la obtención del grado académico. - Como requisito previo a la obtención del grado académico, los y las estudiantes deberán acreditar servicios a la comunidad mediante programas, proyectos de vinculación con la sociedad, prácticas o pasantías pre profesionales con el debido acompañamiento pedagógico, en los campos de su especialidad.'
        },
        {
          crit: 'Obligaciones Conjuntas.',
          value: 'Las partes de común acuerdo diseñarán un plan de actividades académicas que desarrollarán los estudiantes en la ENTIDAD RECEPTORA de acuerdo al número de horas prácticas establecidas en el proyecto de carrera y malla curricular de la carrera de Tecnología Superior en Desarrollo de Software, dicho plan de actividades complementará el aprendizaje y la aplicación de conocimientos, desarrollo de destrezas y habilidades que se consideren necesarias para un adecuado desempeño de su futura profesión.'
        }
          , {
          crit: 'Obligaciones de las partes.',
          partes: [
            {
              parte: 'Del Instituto:',
              oblicacion: [
                {
                  value: `a)	Determinar el número de estudiantes participantes en la realización de las prácticas pre profesionales conforme a las áreas y espacios definidos por la entidad receptora.`
                },
                {
                  value: `b)	Considerar el número de horas determinados para la realización de prácticas preprofesionales conforme al proyecto de carrera y/o ciclo académico.`
                },
                {
                  value: `c)	Definir las actividades para la realización de las prácticas preprofesionales acorde al perfil de la carrera.`
                },
                {
                  value: `d)	Designar a los estudiantes de las carreras de Tecnología Superior en Desarrollo de Software, a fin de que accedan a las prácticas pre profesionales en las instalaciones donde ejerza su actividad económica la ENTIDAD RECEPTORA remitiendo para el efecto la base de datos con la información que acuerden las partes;`
                },
                {
                  value: `e)	Planificar, monitorear, y evaluar las prácticas pre profesionales en coordinación con el tutor que designe la ENTIDAD RECEPTORA;`
                },
                {
                  value: `f)	Designar un tutor académico de prácticas pre profesionales para realizar el debido seguimiento a los estudiantes que acoja la ENTIDAD RECEPTORA; `
                },
                {
                  value: `g)	Velar para que los estudiantes de la carrera de Tecnología Superior en Desarrollo de Software, que realicen sus prácticas pre profesionales se sometan a las políticas, directrices, reglamentos e instrucciones del INSTITUTO y de la ENTIDAD RECEPTORA;`
                },
                {
                  value: `h)	Registrar el informe de evaluación y el certificado cumplimiento de las prácticas pre profesionales en el portafolio académico de los estudiantes que se vinculen a la ENTIDAD RECEPTORA; `
                },
                {
                  value: `i)	Custodiar y archivar los planes de actividades académicas que deben cumplir los estudiantes de prácticas pre profesionales en la ENTIDAD RECEPTORA en la unidad de prácticas pre profesionales para su debido seguimiento.`
                },
                {
                  value: `j)	Suscribir con la Entidad Receptora y Estudiante un acuerdo de confidencialidad.`
                },
              ]
            }, {
              parte: 'De la entidad receptora:',
              oblicacion: [
                {
                  value: `a)	Definir el número de estudiantes participantes en la realización de las prácticas pre profesionales conforme a las áreas, espacios y/o actividad económica de la entidad receptora`
                },
                {
                  value: `b)	El número de estudiantes que acoja la ENTIDAD RECEPTORA se determinará cada inicio del ciclo académico según su capacidad;`
                },
                {
                  value: `c)	Garantizar que los estudiantes de la carrera de Tecnología Superior en Desarrollo de Software, efectúen sus prácticas pre profesionales en las distintas unidades de la ENTIDAD RECEPTORA conforme al plan de actividades académicas que diseñen las partes;`
                },
                {
                  value: `d)	Emitir un informe de evaluación a los estudiantes que acoja para que el Instituto lo incorpore en su portafolio académico;`
                },
                {
                  value: `e)	Emitir los certificados correspondientes a los estudiantes que hayan cumplido exitosamente con el periodo de prácticas pre profesionales en sus instalaciones; y,`
                },
                {
                  value: `f)	Si uno de los estudiantes que se encuentre cursando sus práctica pre profesionales en la ENTIDAD RECEPTORA, actúa con negligencia, dolo, falta de probidad, conducta inmoral, inoperancia, cometiera actos ilícitos o infracciones,y que por ellos la ENTIDAD RECEPTORA, podría verse de alguna forma perjudicada; esta, podrá solicitar la separación inmediata del estudiante para evitar mayores riesgos o perjuicios, remitiendo para el efecto un informe con los hechos acontecidos y las pruebas pertinentes. El debido proceso disciplinario se realizará en el INSTITUTO.`
                },
              ]

            }]
        }
        ]
      }
    ];
  }
}
