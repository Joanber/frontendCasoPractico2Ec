import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Carrera } from "src/app/models/carrera.model";
import { Docente } from "src/app/models/docente.model";
import { CarreraService } from "src/app/services/services.models/carrera.service";
import { DocenteService } from "src/app/services/services.models/docente.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
const bd_url = environment.bd_url;
@Component({
  selector: "app-add-carrera",
  templateUrl: "./add-carrera.component.html",
  styleUrls: ["./add-carrera.component.css"],
  providers: [DatePipe],
})
export class AddCarreraComponent implements OnInit {
  autocompleteControl = new FormControl();
  public carrera = new Carrera();
  public formSubmitted = false;
  public bd_url = bd_url + "/personas";
  public docentes: Docente[] = [];
  public docentesFiltrados: Observable<Docente[]>;

  constructor(
    private carreraService: CarreraService,
    private docenteService: DocenteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private miDatePipe: DatePipe
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarCarrera(id));
    this.cargarDocentes();
  }

  cargarDocentes() {
    this.docenteService.getDocentes().subscribe((docentes) => {
      this.docentes = docentes;
    });
  }
  guardarCarrera(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    if (this.carrera.id) {
      const fechaFormateadaInicio = this.miDatePipe.transform(
        this.carrera.fecha_inicio,
        "yyyy-MM-dd"
      );
      this.carrera.fecha_inicio = fechaFormateadaInicio;

      const fechaFormateadaFin = this.miDatePipe.transform(
        this.carrera.fecha_fin,
        "yyyy-MM-dd"
      );
      this.carrera.fecha_fin = fechaFormateadaFin;

      this.carreraService
        .editar(this.carrera, this.carrera.id)
        .subscribe((carrera) => {
          Swal.fire(
            "Actualizar Carrera",
            `¡${carrera.nombre} actualizada con exito!`,
            "success"
          );
          this.irListaCarreras();
        });
    } else {
      const fechaFormateadaInicio = this.miDatePipe.transform(
        this.carrera.fecha_inicio,
        "yyyy-MM-dd"
      );
      this.carrera.fecha_inicio = fechaFormateadaInicio;

      const fechaFormateadaFin = this.miDatePipe.transform(
        this.carrera.fecha_fin,
        "yyyy-MM-dd"
      );
      this.carrera.fecha_fin = fechaFormateadaFin;
      this.carreraService.crear(this.carrera).subscribe((carrera) => {
        Swal.fire(
          "Nueva Carrera",
          `¡${carrera.nombre} creada con exito!`,
          "success"
        );
        this.irListaCarreras();
      });
    }
  }

  irListaCarreras() {
    this.router.navigateByUrl("/dashboard/carreras");
  }

  cargarCarrera(id: number) {
    if (!id) {
      return;
    }
    this.carreraService.getCarreraById(id).subscribe((carrera) => {
      if (!carrera) {
        return this.irListaCarreras();
      }
      this.carrera = carrera;
    });
  }
  compararCoordinador(d1: Docente, d2: Docente) {
    if (d1 === undefined && d2 === undefined) {
      return true;
    }
    return d1 == null || d2 == null ? false : d1.id === d2.id;
  }
}
