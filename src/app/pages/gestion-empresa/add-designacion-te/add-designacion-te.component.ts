import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Alumno } from "src/app/models/alumno.model";
import { DesignacionTE } from "src/app/models/designacionte.model";
import { EmpresaPersonal } from "src/app/models/empresaPersonal.model";
import { ValidacionSAC } from "src/app/models/validaciones_sac.model";
import { AlumnoService } from "src/app/services/services.models/alumno.service";
import { DesignacionTEService } from "src/app/services/services.models/designacion-te.service";
import { EmpresaService } from "src/app/services/services.models/empresa.service";
import { ValidacionesSacService } from "src/app/services/services.models/validaciones-sac.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-designacion-te",
  templateUrl: "./add-designacion-te.component.html",
  styleUrls: ["./add-designacion-te.component.css"],
})
export class AddDesignacionTeComponent implements OnInit {
  public designacionte = new DesignacionTE();
  public validacionSac = new ValidacionSAC();
  public alumno = new Alumno();
  public empresasPersonales: EmpresaPersonal[] = [];
  public formSubmitted = false;

  public identificacion: string = "";
  public nombres: string = "";

  today = new Date();
  jstoday = "";

  constructor(
    private validacionesSacService: ValidacionesSacService,
    private designacionTEService: DesignacionTEService,
    private alumnoService: AlumnoService,
    private empresaService: EmpresaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarEmpresasPersonales();
    this.activatedRoute.params.subscribe(({ id }) =>
      this.validacion_sacById(id)
    );
    this.activatedRoute.params.subscribe(({ ida }) => this.getByIdAlumno(ida));
    this.activatedRoute.params.subscribe(({ idd }) =>
      this.getDesignacionByAlumnoId(idd)
    );
  }

  private validacion_sacById(id: number) {
    if (!id) {
      return;
    }
    this.validacionesSacService.getValidacionSacById(id).subscribe((val) => {
      this.validacionSac = val;
    });
  }
  private getByIdAlumno(ida: number) {
    if (!ida) {
      return;
    }
    this.alumnoService.getById(ida).subscribe((alumno) => {
      this.alumno = alumno;
    });
  }

  private getDesignacionByAlumnoId(idd: number) {
    if (!idd) {
      return;
    } else {
      this.designacionTEService.getDesignacionTEByAlumnoId(idd).subscribe(
        (designacionTE) => {
          this.designacionte = designacionTE;
          this.identificacion =
            this.designacionte.empresaPersonal.persona.identificacion;
          this.nombres =
            this.designacionte.empresaPersonal.persona.primer_nombre.concat(
              " "
            ) + this.designacionte.empresaPersonal.persona.primer_apellido;
        },
        (err) => {
          if ((err.status = 404)) {
            return this.irListaConvocatoriasValidas();
          }
        }
      );
    }
  }

  private cargarEmpresasPersonales() {
    this.empresaService.getEmpresaPersonal().subscribe((empresasPersonales) => {
      this.empresasPersonales = empresasPersonales;
    });
  }

  compararEmpresaPersonal(d1: EmpresaPersonal, d2: EmpresaPersonal) {
    if (d1 === undefined && d2 === undefined) {
      return true;
    }
    return d1 == null || d2 == null ? false : d1.id === d2.id;
  }
  capturarDatos() {
    this.identificacion =
      this.designacionte.empresaPersonal.persona.identificacion;
    this.nombres =
      this.designacionte.empresaPersonal.persona.primer_nombre.concat(" ") +
      this.designacionte.empresaPersonal.persona.primer_apellido;
  }
  guardarDesignacionTE(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    this.designacionte.alumno = this.alumno;
    this.designacionte.validacionSAC = this.validacionSac;
    this.designacionTEService
      .crear(this.designacionte)
      .subscribe((designacionTE) => {
        Swal.fire(
          "Nueva Designacion de Tutor Empresarial",
          `Nueva Designacion creada con exito!`,
          "success"
        );
        this.irListaConvocatoriasValidas();
      });
  }

  irListaConvocatoriasValidas() {
    this.router.navigateByUrl("/dashboard/convocatorias-aprobadas");
  }
}
