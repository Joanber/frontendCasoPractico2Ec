import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { DateAdapter, ErrorStateMatcher, MatDialog, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Carrera } from 'src/app/models/carrera.model';
import { Docente } from 'src/app/models/docente.model';
import { Empresa } from 'src/app/models/empresa.model';
import { LoaderService } from 'src/app/services/interceptores/loader.service';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { DocenteService } from 'src/app/services/services.models/docente.service';
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
export const DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'DD MMMM, YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-registro-convenios',
  templateUrl: './registro-convenios.component.html',
  styleUrls: ['./registro-convenios.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    }, { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ]
})
export class RegistroConveniosComponent implements OnInit, AfterViewInit {

  constructor(private formbuilder: FormBuilder, private carreraService: CarreraService,
    private empresaServices: EmpresaService, private convenioService: ConvenioService,
    private activatedRoute: ActivatedRoute, public loaderService: LoaderService, private docenteService: DocenteService,
    private router: Router, public dialog: MatDialog, private _formBuilder: FormBuilder) {}
  get formValues() {
    return this.convenioForm.controls;
  }
  get formDatosGenerales() {
    return this.firstFormGroup.controls;
  }

  // forms Array para actividades
  get formEmpresa() {
    return this.secondFormGroup.controls;
  }
  get formArr() {
    return this.secondFormGroup.get('actividadEconomica') as FormArray;
  }
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  nombreInformePrefix = 'SIES-ITS-ISTA';
  fechaInformeSubfix = new Date().getFullYear();
  today = new Date();
  selectNaturalezaEmpresa: string;
  naturalezaEmpresa: string[] = ['Pública', 'Privada', 'Mixta'];
  // public secondFormGroup: FormGroup;
  criteriosGenerales: any[];
  rector = 'Mgtr. Marcelo Aguilera Crespo'
  carreras$ = new Observable<Carrera[]>();
  empresas$ = new Observable<Empresa[]>();
  docentes$ = new Observable<Docente[]>();

  convenio = {} as Convenio;
  convenioForm!: FormGroup;
  index = 0;
  cantones: Array<any>;
  cantonesSucursal: Array<any>;
  btnName = 'Guardar';
  alphabeticPattern = '^[a-zA-ZÀ-ÿÑñ ]+( *[a-zA-ZÀ-ÿÑñ]*)*[a-zA-ZÀ-ÿñÑ ]+$';
  matcher = new MyErrorStateMatcher();
  obligaciones: any[];
  carrera = '';

  ngAfterViewInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => this.retriveConvenio(id));
  }
  changeProvincia(provincia: any, t: any) {
    if (t === 'matriz') {
      this.cantones = this.provincias.find((p) => p.provincia === provincia).cantones;
      return;
    }
    this.cantonesSucursal = this.provincias.find((p) => p.provincia === provincia).cantones;
  }
  ngOnInit() {
    this.loadForm();
    this.retrieveCarreras();
    this.retrieveEmpresas();
    this.retrieveDocentes();
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
  retrieveDocentes() {
    this.docentes$ = this.docenteService.getDocentes();
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
      carrera: [, Validators.required],
      fecha: [new Date().toISOString(), Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      estudiantesIniciales: ['', [Validators.required, Validators.maxLength(4), Validators.pattern('[0-9]*')]],
      estudiantesTotales: ['', [Validators.required, Validators.maxLength(4), Validators.pattern('[0-9]*')]],
      actividadEconomica: this._formBuilder.array([this.initItemRows()]),
      personaAutorizada: ['', [Validators.required, Validators.maxLength(60), Validators.pattern(this.alphabeticPattern)]],
      provinciaSucursal: ['', [Validators.required]],
      direccionSucursal: ['', [Validators.required]],
      tutorEmpresarial: ['Seleccione una empresa', [Validators.required]],
      provinciaMatriz: ['', [Validators.required]],
      direccionMatriz: ['', [Validators.required]],
      tutorAcademico: ['', [Validators.required]],
      cantonSucursal: ['', [Validators.required]],
      correoEmpresa: ['', [Validators.required, Validators.email]],
      justificacion: ['', Validators.required],
      cantonMatriz: ['', [Validators.required]],
      resolucion: ['', Validators.required],
      naturaleza: ['', Validators.required],
      documento: ['Acuerdo 2996 MINISTERIO DE EDUCACIÓN', Validators.required],
      cargoIST: ['', Validators.required],
      vigencia: ['', [Validators.required, Validators.maxLength(2), Validators.pattern('[0-9]*')]],
      empresa: ['', Validators.required],
      cargoER: ['', Validators.required],
      rector: [this.rector, Validators.required],
      accion: ['', Validators.required],
    });

    this.thirdFormGroup = this._formBuilder.group({
      elaborado: ['', Validators.required],
      aprobado: [this.rector, Validators.required],
    });
  }
  get conclusiones() {
    return `Una vez que se han revisado los requerimientos de la carrera de ${ this.carrera }, se concluye que la ${ this.secondFormGroup.value.empresa.nombre }., posee la infraestructura e implementos necesarios para la correcta formación de las prácticas pre profesionales de los y las estudiantes de la carrera en mención, en el ${ this.secondFormGroup!.value.cargoER } de dicha entidad.`;
  }

  get recomendaciones() {
    return `Con lo antes expuesto se recomienda que se firme el convenio entre ${ this.firstFormGroup.value.nombreIST } y ${ this.secondFormGroup.value.empresa.nombre }.`;
  }

  setTutorEmpresarial(persona: any) {
    this.formEmpresa.tutorEmpresarial.markAsTouched();
    this.formEmpresa.tutorEmpresarial.patchValue(persona.primer_nombre + ' ' + persona.segundo_nombre + ' '
      + persona.primer_apellido + ' ' + persona.segundo_apellido);
  }
  setCordinadorCarrera(dd: any, carrera: any) {
    console.log(carrera);

    this.carrera = carrera;
    this.formEmpresa.cargoIST.markAsTouched();
    this.secondFormGroup.patchValue({ cargoIST: `Coordinador(a) de la carrera de ${ this.firstFormGroup.value.carrera.nombre }`, });
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
          value: `Viabilizar las prácticas pre profesionales a los estudiantes de la carrera de ${ this.firstFormGroup.value.carrera.nombre }, ofertada(s) por el ${ this.firstFormGroup.value.nombreIST }, en las instalaciones de la ENTIDAD RECEPTORA ${ this.secondFormGroup.value.empresa.nombre }. de conformidad a lo determinado en el artículo 87 de la Ley Orgánica de Educación Superior, con la finalidad de que cumplan con el requisito de titulación exigido por la normativa de educación superior vigente.`
        },
        {
          crit: 'Ley Orgánica de Educación Superior - LOES.',
          value: 'Art. 87.- Requisitos previos a la obtención del grado académico. - Como requisito previo a la obtención del grado académico, los y las estudiantes deberán acreditar servicios a la comunidad mediante programas, proyectos de vinculación con la sociedad, prácticas o pasantías pre profesionales con el debido acompañamiento pedagógico, en los campos de su especialidad.'
        },
        {
          crit: 'Obligaciones Conjuntas.',
          value: `Las partes de común acuerdo diseñarán un plan de actividades académicas que desarrollarán los estudiantes en la ENTIDAD RECEPTORA de acuerdo al número de horas prácticas establecidas en el proyecto de carrera y malla curricular de la carrera de ${ this.firstFormGroup.value.carrera.nombre }, dicho plan de actividades complementará el aprendizaje y la aplicación de conocimientos, desarrollo de destrezas y habilidades que se consideren necesarias para un adecuado desempeño de su futura profesión.`
        }
          , {
          crit: 'Obligaciones de las partes.',
          partes: [
            {
              parte: 'Del Instituto:',
              oblicacion: [
                {
                  value: `a)  Determinar el número de estudiantes participantes en la realización de las prácticas pre profesionales conforme a las áreas y espacios definidos por la entidad receptora.`
                },
                {
                  value: `b)  Considerar el número de horas determinados para la realización de prácticas preprofesionales conforme al proyecto de carrera y/o ciclo académico.`
                },
                {
                  value: `c)  Definir las actividades para la realización de las prácticas preprofesionales acorde al perfil de la carrera.`
                },
                {
                  value: `d)  Designar a los estudiantes de las carreras de ${ this.firstFormGroup.value.carrera.nombre }, a fin de que accedan a las prácticas pre profesionales en las instalaciones donde ejerza su actividad económica la ENTIDAD RECEPTORA remitiendo para el efecto la base de datos con la información que acuerden las partes;`
                },
                {
                  value: `e)  Planificar, monitorear, y evaluar las prácticas pre profesionales en coordinación con el tutor que designe la ENTIDAD RECEPTORA;`
                },
                {
                  value: `f)  Designar un tutor académico de prácticas pre profesionales para realizar el debido seguimiento a los estudiantes que acoja la ENTIDAD RECEPTORA; `
                },
                {
                  value: `g)  Velar para que los estudiantes de la carrera de ${ this.firstFormGroup.value.carrera.nombre }, que realicen sus prácticas pre profesionales se sometan a las políticas, directrices, reglamentos e instrucciones del INSTITUTO y de la ENTIDAD RECEPTORA;`
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
                  value: `c)	Garantizar que los estudiantes de la carrera de ${ this.firstFormGroup.value.carrera.nombre }, efectúen sus prácticas pre profesionales en las distintas unidades de la ENTIDAD RECEPTORA conforme al plan de actividades académicas que diseñen las partes;`
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
  provincias = [{
    provincia: "AZUAY",
    cantones: [
      {
        canton: "CUENCA"
      },
      {
        canton: "GIRÓN"
      },
      {
        canton: "GUALACEO"
      },
      {
        canton: "NABÓN"
      },
      {
        canton: "PAUTE"
      },
      {
        canton: "PUCARA"
      },
      {
        canton: "SAN FERNANDO"
      },
      {
        canton: "SANTA ISABEL"
      },
      {
        canton: "SIGSIG"
      },
      {
        canton: "OÑA"
      },
      {
        canton: "CHORDELEG"
      },
      {
        canton: "EL PAN"
      },
      {
        canton: "SEVILLA DE ORO"
      },
      {
        canton: "GUACHAPALA"
      },
      {
        canton: "CAMILO PONCE ENRÍQUEZ"
      }
    ]
  },
  {
    provincia: "BOLIVAR",
    cantones: [
      {
        canton: "GUARANDA"
      },
      {
        canton: "CHILLANES"
      },
      {
        canton: "CHIMBO"
      },
      {
        canton: "ECHEANDÍA"
      },
      {
        canton: "SAN MIGUEL"
      },
      {
        canton: "CALUMA"
      },
      {
        canton: "LAS NAVES"
      }
    ]
  },
  {
    provincia: "CAÑAR",
    cantones: [
      {
        canton: "AZOGUES"
      },
      {
        canton: "BIBLIÁN"
      },
      {
        canton: "CAÑAR"
      },
      {
        canton: "LA TRONCAL"
      },
      {
        canton: "EL TAMBO"
      },
      {
        canton: "DÉLEG"
      },
      {
        canton: "SUSCAL"
      }
    ]
  },
  {
    provincia: "CARCHI",
    cantones: [
      {
        canton: "TULCÁN"
      },
      {
        canton: "BOLÍVAR"
      },
      {
        canton: "ESPEJO"
      },
      {
        canton: "MIRA"
      },
      {
        canton: "MONTÚFAR"
      },
      {
        canton: "SAN PEDRO DE HUACA"
      }
    ]
  },
  {
    provincia: "COTOPAXI",
    cantones: [
      {
        canton: "LATACUNGA"
      },
      {
        canton: "LA MANÁ"
      },
      {
        canton: "PANGUA"
      },
      {
        canton: "PUJILI"
      },
      {
        canton: "SALCEDO"
      },
      {
        canton: "SAQUISILÍ"
      },
      {
        canton: "SIGCHOS"
      }
    ]
  },
  {
    provincia: "CHIMBORAZO",
    cantones: [
      {
        canton: "RIOBAMBA"
      },
      {
        canton: "ALAUSI"
      },
      {
        canton: "COLTA"
      },
      {
        canton: "CHAMBO"
      },
      {
        canton: "CHUNCHI"
      },
      {
        canton: "GUAMOTE"
      },
      {
        canton: "GUANO"
      },
      {
        canton: "PALLATANGA"
      },
      {
        canton: "PENIPE"
      },
      {
        canton: "CUMANDÁ"
      }
    ]
  },
  {
    provincia: "EL ORO",
    cantones: [
      {
        canton: "MACHALA"
      },
      {
        canton: "ARENILLAS"
      },
      {
        canton: "ATAHUALPA"
      },
      {
        canton: "BALSAS"
      },
      {
        canton: "CHILLA"
      },
      {
        canton: "EL GUABO"
      },
      {
        canton: "HUAQUILLAS"
      },
      {
        canton: "MARCABELÍ"
      },
      {
        canton: "PASAJE"
      },
      {
        canton: "PIÑAS"
      },
      {
        canton: "PORTOVELO"
      },
      {
        canton: "SANTA ROSA"
      },
      {
        canton: "ZARUMA"
      },
      {
        canton: "LAS LAJAS"
      }
    ]
  },
  {
    provincia: "ESMERALDAS",
    cantones: [
      {
        canton: "ESMERALDAS"
      },
      {
        canton: "ELOY ALFARO"
      },
      {
        canton: "MUISNE"
      },
      {
        canton: "QUININDÉ"
      },
      {
        canton: "SAN LORENZO"
      },
      {
        canton: "ATACAMES"
      },
      {
        canton: "RIOVERDE"
      },
      {
        canton: "LA CONCORDIA"
      }
    ]
  },
  {
    provincia: "GUAYAS",
    cantones: [
      {
        canton: "GUAYAQUIL"
      },
      {
        canton: "ALFREDO BAQUERIZO MORENO (JUJÁN)"
      },
      {
        canton: "BALAO"
      },
      {
        canton: "BALZAR"
      },
      {
        canton: "COLIMES"
      },
      {
        canton: "DAULE"
      },
      {
        canton: "DURÁN"
      },
      {
        canton: "EL EMPALME"
      },
      {
        canton: "EL TRIUNFO"
      },
      {
        canton: "MILAGRO"
      },
      {
        canton: "NARANJAL"
      },
      {
        canton: "NARANJITO"
      },
      {
        canton: "PALESTINA"
      },
      {
        canton: "PEDRO CARBO"
      },
      {
        canton: "SAMBORONDÓN"
      },
      {
        canton: "SANTA LUCÍA"
      },
      {
        canton: "SALITRE (URBINA JADO)"
      },
      {
        canton: "SAN JACINTO DE YAGUACHI"
      },
      {
        canton: "PLAYAS"
      },
      {
        canton: "SIMÓN BOLÍVAR"
      },
      {
        canton: "CORONEL MARCELINO MARIDUEÑA"
      },
      {
        canton: "LOMAS DE SARGENTILLO"
      },
      {
        canton: "NOBOL"
      },
      {
        canton: "GENERAL ANTONIO ELIZALDE"
      },
      {
        canton: "ISIDRO AYORA"
      }
    ]
  },
  {
    provincia: "IMBABURA",
    cantones: [
      {
        canton: "IBARRA"
      },
      {
        canton: "ANTONIO ANTE"
      },
      {
        canton: "COTACACHI"
      },
      {
        canton: "OTAVALO"
      },
      {
        canton: "PIMAMPIRO"
      },
      {
        canton: "SAN MIGUEL DE URCUQUÍ"
      }
    ]
  },
  {
    provincia: "LOJA",
    cantones: [
      {
        canton: "LOJA"
      },
      {
        canton: "CALVAS"
      },
      {
        canton: "CATAMAYO"
      },
      {
        canton: "CELICA"
      },
      {
        canton: "CHAGUARPAMBA"
      },
      {
        canton: "ESPÍNDOLA"
      },
      {
        canton: "GONZANAMÁ"
      },
      {
        canton: "MACARÁ"
      },
      {
        canton: "PALTAS"
      },
      {
        canton: "PUYANGO"
      },
      {
        canton: "SARAGURO"
      },
      {
        canton: "SOZORANGA"
      },
      {
        canton: "ZAPOTILLO"
      },
      {
        canton: "PINDAL"
      },
      {
        canton: "QUILANGA"
      },
      {
        canton: "OLMEDO"
      }
    ]
  },
  {
    provincia: "LOS RIOS",
    cantones: [
      {
        canton: "BABAHOYO"
      },
      {
        canton: "BABA"
      },
      {
        canton: "MONTALVO"
      },
      {
        canton: "PUEBLOVIEJO"
      },
      {
        canton: "QUEVEDO"
      },
      {
        canton: "URDANETA"
      },
      {
        canton: "VENTANAS"
      },
      {
        canton: "VÍNCES"
      },
      {
        canton: "PALENQUE"
      },
      {
        canton: "BUENA FÉ"
      },
      {
        canton: "VALENCIA"
      },
      {
        canton: "MOCACHE"
      },
      {
        canton: "QUINSALOMA"
      }
    ]
  },
  {
    provincia: "MANABI",
    cantones: [
      {
        canton: "PORTOVIEJO"
      },
      {
        canton: "BOLÍVAR"
      },
      {
        canton: "CHONE"
      },
      {
        canton: "EL CARMEN"
      },
      {
        canton: "FLAVIO ALFARO"
      },
      {
        canton: "JIPIJAPA"
      },
      {
        canton: "JUNÍN"
      },
      {
        canton: "MANTA"
      },
      {
        canton: "MONTECRISTI"
      },
      {
        canton: "PAJÁN"
      },
      {
        canton: "PICHINCHA"
      },
      {
        canton: "ROCAFUERTE"
      },
      {
        canton: "SANTA ANA"
      },
      {
        canton: "SUCRE"
      },
      {
        canton: "TOSAGUA"
      },
      {
        canton: "24 DE MAYO"
      },
      {
        canton: "PEDERNALES"
      },
      {
        canton: "OLMEDO"
      },
      {
        canton: "PUERTO LÓPEZ"
      },
      {
        canton: "JAMA"
      },
      {
        canton: "JARAMIJÓ"
      },
      {
        canton: "SAN VICENTE"
      }
    ]
  },
  {
    provincia: "MORONA SANTIAGO",
    cantones: [
      {
        canton: "MORONA"
      },
      {
        canton: "GUALAQUIZA"
      },
      {
        canton: "LIMÓN INDANZA"
      },
      {
        canton: "PALORA"
      },
      {
        canton: "SANTIAGO"
      },
      {
        canton: "SUCÚA"
      },
      {
        canton: "HUAMBOYA"
      },
      {
        canton: "SAN JUAN BOSCO"
      },
      {
        canton: "TAISHA"
      },
      {
        canton: "LOGROÑO"
      },
      {
        canton: "PABLO SEXTO"
      },
      {
        canton: "TIWINTZA"
      }
    ]
  },
  {
    provincia: "NAPO",
    cantones: [
      {
        canton: "TENA"
      },
      {
        canton: "ARCHIDONA"
      },
      {
        canton: "EL CHACO"
      },
      {
        canton: "QUIJOS"
      },
      {
        canton: "CARLOS JULIO AROSEMENA TOLA"
      }
    ]
  },
  {
    provincia: "PASTAZA",
    cantones: [
      {
        canton: "PASTAZA"
      },
      {
        canton: "MERA"
      },
      {
        canton: "SANTA CLARA"
      },
      {
        canton: "ARAJUNO"
      }
    ]
  },
  {
    provincia: "PICHINCHA",
    cantones: [
      {
        canton: "QUITO"
      },
      {
        canton: "CAYAMBE"
      },
      {
        canton: "MEJIA"
      },
      {
        canton: "PEDRO MONCAYO"
      },
      {
        canton: "RUMIÑAHUI"
      },
      {
        canton: "SAN MIGUEL DE LOS BANCOS"
      },
      {
        canton: "PEDRO VICENTE MALDONADO"
      },
      {
        canton: "PUERTO QUITO"
      }
    ]
  },
  {
    provincia: "TUNGURAHUA",
    cantones: [
      {
        canton: "AMBATO"
      },
      {
        canton: "BAÑOS DE AGUA SANTA"
      },
      {
        canton: "CEVALLOS"
      },
      {
        canton: "MOCHA"
      },
      {
        canton: "PATATE"
      },
      {
        canton: "QUERO"
      },
      {
        canton: "SAN PEDRO DE PELILEO"
      },
      {
        canton: "SANTIAGO DE PÍLLARO"
      },
      {
        canton: "TISALEO"
      }
    ]
  },
  {
    provincia: "ZAMORA CHINCHIPE",
    cantones: [
      {
        canton: "ZAMORA"
      },
      {
        canton: "CHINCHIPE"
      },
      {
        canton: "NANGARITZA"
      },
      {
        canton: "YACUAMBI"
      },
      {
        canton: "YANTZAZA (YANZATZA)"
      },
      {
        canton: "EL PANGUI"
      },
      {
        canton: "CENTINELA DEL CÓNDOR"
      },
      {
        canton: "PALANDA"
      },
      {
        canton: "PAQUISHA"
      }
    ]
  },
  {
    provincia: "GALAPAGOS",
    cantones: [
      {
        canton: "SAN CRISTÓBAL"
      },
      {
        canton: "ISABELA"
      },
      {
        canton: "SANTA CRUZ"
      }
    ]
  },
  {
    provincia: "SUCUMBIOS",
    cantones: [
      {
        canton: "LAGO AGRIO"
      },
      {
        canton: "GONZALO PIZARRO"
      },
      {
        canton: "PUTUMAYO"
      },
      {
        canton: "SHUSHUFINDI"
      },
      {
        canton: "SUCUMBÍOS"
      },
      {
        canton: "CASCALES"
      },
      {
        canton: "CUYABENO"
      }
    ]
  },
  {
    provincia: "ORELLANA",
    cantones: [
      {
        canton: "ORELLANA"
      },
      {
        canton: "AGUARICO"
      },
      {
        canton: "LA JOYA DE LOS SACHAS"
      },
      {
        canton: "LORETO"
      }
    ]
  },
  {
    provincia: "SANTO DOMINGO DE LOS TSACHILAS",
    cantones: [
      {
        canton: "SANTO DOMINGO"
      }
    ]
  },
  {
    provincia: "SANTA ELENA",
    cantones: [
      {
        canton: "SANTA ELENA"
      },
      {
        canton: "LA LIBERTAD"
      },
      {
        canton: "SALINAS"
      }
    ]
  },
  {
    provincia: "ZONAS NO DELIMITADAS",
    cantones: [
      {
        canton: "LAS GOLONDRINAS"
      },
      {
        canton: "MANGA DEL CURA"
      },
      {
        canton: "EL PIEDRERO"
      }
    ]
  }
  ];
}
