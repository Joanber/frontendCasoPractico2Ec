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

  constructor(private carreraService: CarreraService,
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
  convenioForm!: FormGroup;
  nombreInformePrefix = 'SIES-ITS-ISTA';
  fechaInformeSubfix = new Date().getFullYear();
  today = new Date();
  selectNaturalezaEmpresa: string;
  naturalezaEmpresa: string[] = ['P??blica', 'Privada', 'Mixta'];
  // public secondFormGroup: FormGroup;
  criteriosGenerales: any[];
  rector = 'Mgtr. Marcelo Aguilera Crespo'
  carreras$ = new Observable<Carrera[]>();
  empresas$ = new Observable<Empresa[]>();
  docentes$ = new Observable<Docente[]>();

  convenio = {} as Convenio;
  index = 0;
  cantones: Array<any>;
  cantonesSucursal: Array<any>;
  btnName = 'Guardar';
  alphabeticPattern = '^[a-zA-Z??-?????? ]+( *[a-zA-Z??-??????]*)*[a-zA-Z??-?????? ]+$';
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
  }


  loadForm() {
    if (this.convenio.id) {
      this.patchForm(this.convenio);
      return;
    }

    this.convenioForm = this._formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(this.alphabeticPattern)]],
      carrera: ['', Validators.required],
      empresa: ['', Validators.required],
      id: []
    });

    this.firstFormGroup = this._formBuilder.group({
      numInforme: ['', [Validators.required, Validators.maxLength(5), Validators.pattern('[0-9]*')]],
      nombre: ['', [Validators.required, Validators.pattern(this.alphabeticPattern)]],
      nombreIST: ['INSTITUTO SUPERIOR TECNOL??GICO DEL AZUAY', Validators.pattern(this.alphabeticPattern)],
      carrera: [, Validators.required],
      fecha: [new Date().toISOString(), Validators.required],
      id: []
    });

    this.secondFormGroup = this._formBuilder.group({
      estudiantesIniciales: ['', [Validators.required, Validators.maxLength(4), Validators.pattern('[0-9]*')]],
      estudiantesTotales: ['', [Validators.required, Validators.maxLength(4), Validators.pattern('[0-9]*')]],
      actividadEconomica: this._formBuilder.array([]),
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
      documento: ['Acuerdo 2996 MINISTERIO DE EDUCACI??N', Validators.required],
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
    // this.convenio = this.convenioForm.value;
    // this.convenio.carrera = await this.carreras$.pipe(map(carreras => carreras.find(c =>
    //   c.id === this.convenioForm.value.carrera))).toPromise();
    // this.convenio.empresa = await this.empresas$.pipe(map(empresas => empresas.find(e =>
    //   e.id === this.convenioForm.value.empresa))).toPromise();
    this.convenio.nombre = this.firstFormGroup.value.nombre;
    this.convenio.carrera = this.firstFormGroup.value.carrera;
    this.convenio.empresa = this.secondFormGroup.value.empresa;
    this.convenio.numInforme = this.firstFormGroup.value.numInforme;
    this.convenio.nombreIST = this.firstFormGroup.value.nombreIST;
    this.convenio.fecha = this.firstFormGroup.value.fecha;
    this.convenio.estudiantesIniciales = this.secondFormGroup.value.estudiantesIniciales;
    this.convenio.estudiantesTotales = this.secondFormGroup.value.estudiantesTotales;
    this.convenio.actividadEconomica = this.secondFormGroup.value.actividadEconomica;
    this.convenio.personaAutorizada = this.secondFormGroup.value.personaAutorizada;
    this.convenio.provinciaSucursal = this.secondFormGroup.value.provinciaSucursal;
    this.convenio.direccionSucursal = this.secondFormGroup.value.direccionSucursal;
    this.convenio.tutorEmpresarial = this.secondFormGroup.value.tutorEmpresarial;
    this.convenio.provinciaMatriz = this.secondFormGroup.value.provinciaMatriz;
    this.convenio.direccionMatriz = this.secondFormGroup.value.direccionMatriz;
    this.convenio.tutorAcademico = this.secondFormGroup.value.tutorAcademico;
    this.convenio.cantonSucursal = this.secondFormGroup.value.cantonSucursal;
    this.convenio.correoEmpresa = this.secondFormGroup.value.correoEmpresa;
    this.convenio.justificacion = this.secondFormGroup.value.justificacion;
    this.convenio.cantonMatriz = this.secondFormGroup.value.cantonMatriz;
    this.convenio.resolucion = this.secondFormGroup.value.resolucion;
    this.convenio.naturaleza = this.secondFormGroup.value.naturaleza;
    this.convenio.documento = this.secondFormGroup.value.documento;
    this.convenio.elaborado = this.thirdFormGroup.value.elaborado;
    this.convenio.cargoIST = this.secondFormGroup.value.cargoIST;
    this.convenio.vigencia = this.secondFormGroup.value.vigencia;
    this.convenio.cargoER = this.secondFormGroup.value.cargoER;
    this.convenio.rector = this.secondFormGroup.value.rector;
    this.convenio.accion = this.secondFormGroup.value.accion;
    this.convenio.aprobado = this.thirdFormGroup.value.aprobado;
    // this.convenio = this.secondFormGroup.value;
    // this.convenio = this.thirdFormGroup.value;
    console.log('To Submit', this.convenio);
  }

  onSubmit() {
    if (this.firstFormGroup.valid || this.secondFormGroup.valid || this.thirdFormGroup.valid && !this.convenio.id) {

      this.createConvenio().finally(() => {
      this.convenioService.createConvenio(this.convenio).subscribe({
        next: (convenio) => Swal.fire(
          'Nueva Convenio',
          `??${ convenio.nombre } creado con exito!`,
          'success'
        ), complete: () => this.returnToList()
        , error: (err) => console.error(err)
      });
      });
    }
    if ((this.firstFormGroup.valid || this.secondFormGroup.valid || this.thirdFormGroup.valid)  && this.convenio.id) {
      this.createConvenio().finally(() => {
        console.warn('To Update', this.convenioForm.value);
        this.convenioService.updateConvenio(this.convenio, this.convenio.id).subscribe({
          next: (convenio) =>
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Actualizar Convenio',
              text: `??${ convenio.nombre } actualizado con exito!`,
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

  async patchForm(convenio: Convenio) {
    this.firstFormGroup.markAllAsTouched();
    this.secondFormGroup.markAllAsTouched();
    this.thirdFormGroup.markAllAsTouched();

    this.convenioForm.patchValue({
      id: convenio.id,
      nombre: convenio.nombre,
      carrera: convenio.carrera.id,
      empresa: convenio.empresa.id
    });
    this.firstFormGroup.patchValue({
      numInforme: convenio.numInforme,
      nombre: convenio.nombre,
      nombreIST: convenio.nombreIST,
      carrera: await this.carreras$.pipe(map(carreras => carreras.find(c =>
        c.id === convenio.carrera.id))).toPromise().finally(),
      fecha: convenio.fecha,
    });

    this.changeProvincia(convenio.provinciaMatriz, 'matriz');
    this.changeProvincia(convenio.provinciaSucursal, '');
    if (convenio.actividadEconomica !== null) {
      convenio.actividadEconomica.forEach((data, index) => {
        this.formArr.push(this.initItemRows());
        this.secondFormGroup.markAllAsTouched();
        this.formArr.controls[index].setValue(data);
        this.deleteRow(index+1);
      });
   }

    this.secondFormGroup.patchValue({
      estudiantesIniciales: convenio.estudiantesIniciales,
      estudiantesTotales: convenio.estudiantesTotales,
      personaAutorizada: convenio.personaAutorizada,
      provinciaSucursal: convenio.provinciaSucursal,
      direccionSucursal: convenio.direccionSucursal,
      tutorEmpresarial: convenio.tutorEmpresarial,
      provinciaMatriz: convenio.provinciaMatriz,
      direccionMatriz: convenio.direccionMatriz,
      tutorAcademico: await this.docentes$.pipe(map(docentes => docentes.find(d =>
        d.id === convenio.tutorAcademico.id))).toPromise(),
      cantonSucursal: convenio.cantonSucursal,
      correoEmpresa: convenio.correoEmpresa,
      justificacion: convenio.justificacion,
      cantonMatriz: convenio.cantonMatriz,
      resolucion: convenio.resolucion,
      naturaleza: convenio.naturaleza,
      documento: convenio.documento,
      cargoIST: convenio.cargoIST,
      vigencia: convenio.vigencia,
      cargoER: convenio.cargoER,
      rector: convenio.rector,
      accion: convenio.accion,
      empresa: await this.empresas$.pipe(map(empresas => empresas.find(e =>
        e.id === convenio.empresa.id))).toPromise() ,
    });

    this.thirdFormGroup = this._formBuilder.group({
      elaborado: convenio.elaborado,
      aprobado: convenio.aprobado,
    });
  }

  actividadesControls(i: number) {
    return this.formArr.controls[i][' controls '];
  }

  get conclusiones() {
    return `Una vez que se han revisado los requerimientos de la carrera de ${ this.carrera }, se concluye que la ${ this.secondFormGroup.value.empresa.nombre }., posee la infraestructura e implementos necesarios para la correcta formaci??n de las pr??cticas pre profesionales de los y las estudiantes de la carrera en menci??n, en el ${ this.secondFormGroup!.value.cargoER } de dicha entidad.`;
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
          value: `Viabilizar las pr??cticas pre profesionales a los estudiantes de la carrera de ${ this.firstFormGroup.value.carrera.nombre }, ofertada(s) por el ${ this.firstFormGroup.value.nombreIST }, en las instalaciones de la ENTIDAD RECEPTORA ${ this.secondFormGroup.value.empresa.nombre }. de conformidad a lo determinado en el art??culo 87 de la Ley Org??nica de Educaci??n Superior, con la finalidad de que cumplan con el requisito de titulaci??n exigido por la normativa de educaci??n superior vigente.`
        },
        {
          crit: 'Ley Org??nica de Educaci??n Superior - LOES.',
          value: 'Art. 87.- Requisitos previos a la obtenci??n del grado acad??mico. - Como requisito previo a la obtenci??n del grado acad??mico, los y las estudiantes deber??n acreditar servicios a la comunidad mediante programas, proyectos de vinculaci??n con la sociedad, pr??cticas o pasant??as pre profesionales con el debido acompa??amiento pedag??gico, en los campos de su especialidad.'
        },
        {
          crit: 'Obligaciones Conjuntas.',
          value: `Las partes de com??n acuerdo dise??ar??n un plan de actividades acad??micas que desarrollar??n los estudiantes en la ENTIDAD RECEPTORA de acuerdo al n??mero de horas pr??cticas establecidas en el proyecto de carrera y malla curricular de la carrera de ${ this.firstFormGroup.value.carrera.nombre }, dicho plan de actividades complementar?? el aprendizaje y la aplicaci??n de conocimientos, desarrollo de destrezas y habilidades que se consideren necesarias para un adecuado desempe??o de su futura profesi??n.`
        }
          , {
          crit: 'Obligaciones de las partes.',
          partes: [
            {
              parte: 'Del Instituto:',
              oblicacion: [
                {
                  value: `a)  Determinar el n??mero de estudiantes participantes en la realizaci??n de las pr??cticas pre profesionales conforme a las ??reas y espacios definidos por la entidad receptora.`
                },
                {
                  value: `b)  Considerar el n??mero de horas determinados para la realizaci??n de pr??cticas preprofesionales conforme al proyecto de carrera y/o ciclo acad??mico.`
                },
                {
                  value: `c)  Definir las actividades para la realizaci??n de las pr??cticas preprofesionales acorde al perfil de la carrera.`
                },
                {
                  value: `d)  Designar a los estudiantes de las carreras de ${ this.firstFormGroup.value.carrera.nombre }, a fin de que accedan a las pr??cticas pre profesionales en las instalaciones donde ejerza su actividad econ??mica la ENTIDAD RECEPTORA remitiendo para el efecto la base de datos con la informaci??n que acuerden las partes;`
                },
                {
                  value: `e)  Planificar, monitorear, y evaluar las pr??cticas pre profesionales en coordinaci??n con el tutor que designe la ENTIDAD RECEPTORA;`
                },
                {
                  value: `f)  Designar un tutor acad??mico de pr??cticas pre profesionales para realizar el debido seguimiento a los estudiantes que acoja la ENTIDAD RECEPTORA; `
                },
                {
                  value: `g)  Velar para que los estudiantes de la carrera de ${ this.firstFormGroup.value.carrera.nombre }, que realicen sus pr??cticas pre profesionales se sometan a las pol??ticas, directrices, reglamentos e instrucciones del INSTITUTO y de la ENTIDAD RECEPTORA;`
                },
                {
                  value: `h)	Registrar el informe de evaluaci??n y el certificado cumplimiento de las pr??cticas pre profesionales en el portafolio acad??mico de los estudiantes que se vinculen a la ENTIDAD RECEPTORA; `
                },
                {
                  value: `i)	Custodiar y archivar los planes de actividades acad??micas que deben cumplir los estudiantes de pr??cticas pre profesionales en la ENTIDAD RECEPTORA en la unidad de pr??cticas pre profesionales para su debido seguimiento.`
                },
                {
                  value: `j)	Suscribir con la Entidad Receptora y Estudiante un acuerdo de confidencialidad.`
                },
              ]
            }, {
              parte: 'De la entidad receptora:',
              oblicacion: [
                {
                  value: `a)	Definir el n??mero de estudiantes participantes en la realizaci??n de las pr??cticas pre profesionales conforme a las ??reas, espacios y/o actividad econ??mica de la entidad receptora`
                },
                {
                  value: `b)	El n??mero de estudiantes que acoja la ENTIDAD RECEPTORA se determinar?? cada inicio del ciclo acad??mico seg??n su capacidad;`
                },
                {
                  value: `c)	Garantizar que los estudiantes de la carrera de ${ this.firstFormGroup.value.carrera.nombre }, efect??en sus pr??cticas pre profesionales en las distintas unidades de la ENTIDAD RECEPTORA conforme al plan de actividades acad??micas que dise??en las partes;`
                },
                {
                  value: `d)	Emitir un informe de evaluaci??n a los estudiantes que acoja para que el Instituto lo incorpore en su portafolio acad??mico;`
                },
                {
                  value: `e)	Emitir los certificados correspondientes a los estudiantes que hayan cumplido exitosamente con el periodo de pr??cticas pre profesionales en sus instalaciones; y,`
                },
                {
                  value: `f)	Si uno de los estudiantes que se encuentre cursando sus pr??ctica pre profesionales en la ENTIDAD RECEPTORA, act??a con negligencia, dolo, falta de probidad, conducta inmoral, inoperancia, cometiera actos il??citos o infracciones,y que por ellos la ENTIDAD RECEPTORA, podr??a verse de alguna forma perjudicada; esta, podr?? solicitar la separaci??n inmediata del estudiante para evitar mayores riesgos o perjuicios, remitiendo para el efecto un informe con los hechos acontecidos y las pruebas pertinentes. El debido proceso disciplinario se realizar?? en el INSTITUTO.`
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
        canton: "GIR??N"
      },
      {
        canton: "GUALACEO"
      },
      {
        canton: "NAB??N"
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
        canton: "O??A"
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
        canton: "CAMILO PONCE ENR??QUEZ"
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
        canton: "ECHEAND??A"
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
    provincia: "CA??AR",
    cantones: [
      {
        canton: "AZOGUES"
      },
      {
        canton: "BIBLI??N"
      },
      {
        canton: "CA??AR"
      },
      {
        canton: "LA TRONCAL"
      },
      {
        canton: "EL TAMBO"
      },
      {
        canton: "D??LEG"
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
        canton: "TULC??N"
      },
      {
        canton: "BOL??VAR"
      },
      {
        canton: "ESPEJO"
      },
      {
        canton: "MIRA"
      },
      {
        canton: "MONT??FAR"
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
        canton: "LA MAN??"
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
        canton: "SAQUISIL??"
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
        canton: "CUMAND??"
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
        canton: "MARCABEL??"
      },
      {
        canton: "PASAJE"
      },
      {
        canton: "PI??AS"
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
        canton: "QUININD??"
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
        canton: "ALFREDO BAQUERIZO MORENO (JUJ??N)"
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
        canton: "DUR??N"
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
        canton: "SAMBOROND??N"
      },
      {
        canton: "SANTA LUC??A"
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
        canton: "SIM??N BOL??VAR"
      },
      {
        canton: "CORONEL MARCELINO MARIDUE??A"
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
        canton: "SAN MIGUEL DE URCUQU??"
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
        canton: "ESP??NDOLA"
      },
      {
        canton: "GONZANAM??"
      },
      {
        canton: "MACAR??"
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
        canton: "V??NCES"
      },
      {
        canton: "PALENQUE"
      },
      {
        canton: "BUENA F??"
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
        canton: "BOL??VAR"
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
        canton: "JUN??N"
      },
      {
        canton: "MANTA"
      },
      {
        canton: "MONTECRISTI"
      },
      {
        canton: "PAJ??N"
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
        canton: "PUERTO L??PEZ"
      },
      {
        canton: "JAMA"
      },
      {
        canton: "JARAMIJ??"
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
        canton: "LIM??N INDANZA"
      },
      {
        canton: "PALORA"
      },
      {
        canton: "SANTIAGO"
      },
      {
        canton: "SUC??A"
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
        canton: "LOGRO??O"
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
        canton: "RUMI??AHUI"
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
        canton: "BA??OS DE AGUA SANTA"
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
        canton: "SANTIAGO DE P??LLARO"
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
        canton: "CENTINELA DEL C??NDOR"
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
        canton: "SAN CRIST??BAL"
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
        canton: "SUCUMB??OS"
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
