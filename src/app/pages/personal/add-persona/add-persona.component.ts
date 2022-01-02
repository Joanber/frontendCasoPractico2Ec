import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Persona } from "src/app/models/persona.model";
import { PersonaService } from "src/app/services/services.models/persona.service";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
const bd_url = environment.bd_url;
@Component({
  selector: "app-add-persona",
  templateUrl: "./add-persona.component.html",
  styleUrls: ["./add-persona.component.css"],
  providers: [DatePipe],
})
export class AddPersonaComponent implements OnInit {
  public persona = new Persona();
  public formSubmitted = false;
  public imgTemp: any = "../../../../assets/imgapp/image.png";
  public fotoUpload: File;
  public bd_url = bd_url + "/personas";
  constructor(
    private personaService: PersonaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private miDatePipe: DatePipe
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }) => this.cargarPersona(id));
  }

  guardarPersona(form: NgForm) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }
    if (this.persona.id) {
      if (!this.fotoUpload) {
        this.personaService
          .editarSinFoto(this.persona, this.persona.id)
          .subscribe((persona) => {
            Swal.fire(
              "Actualizar Persona",
              `¡${persona.primer_nombre} ${persona.primer_apellido} actualizado con exito!`,
              "success"
            );
            this.irListaPersonas();
          });
      } else if (!this.fotoUpload && this.persona.fotoHashCode != null) {
        const hasCode: number = this.persona.fotoHashCode;
        this.persona.fotoHashCode = hasCode;
        const fechaFormateada = this.miDatePipe.transform(
          this.persona.fecha_nacimiento,
          "yyyy-MM-dd"
        );
        this.persona.fecha_nacimiento = fechaFormateada;
        this.personaService
          .editarConFoto(this.persona, this.fotoUpload, this.persona.id)
          .subscribe((persona) => {
            Swal.fire(
              "Actualizar Persona",
              `¡${persona.primer_nombre} ${persona.primer_apellido} actualizado con exito!`,
              "success"
            );
            this.irListaPersonas();
          });
      } else {
        const fechaFormateada = this.miDatePipe.transform(
          this.persona.fecha_nacimiento,
          "yyyy-MM-dd"
        );
        this.persona.fecha_nacimiento = fechaFormateada;
        this.personaService
          .editarConFoto(this.persona, this.fotoUpload, this.persona.id)
          .subscribe((persona) => {
            Swal.fire(
              "Actualizar Persona",
              `¡${persona.primer_nombre} ${persona.primer_apellido} actualizado con exito!`,
              "success"
            );
            this.irListaPersonas();
          });
      }
    } else {
      if (!this.fotoUpload) {
        this.personaService.crearSinFoto(this.persona).subscribe((persona) => {
          Swal.fire(
            "Nueva Persona",
            `¡${persona.primer_nombre} ${persona.primer_apellido} creado con exito!`,
            "success"
          );
          this.irListaPersonas();
        });
      } else {
        const fechaFormateada = this.miDatePipe.transform(
          this.persona.fecha_nacimiento,
          "yyyy-MM-dd"
        );
        this.persona.fecha_nacimiento = fechaFormateada;
        this.personaService
          .crearConFoto(this.persona, this.fotoUpload)
          .subscribe((persona) => {
            Swal.fire(
              "Nueva Persona",
              `¡${persona.primer_nombre} ${persona.primer_apellido} creado con exito!`,
              "success"
            );
            this.irListaPersonas();
          });
      }
    }
  }

  //SELECIONAR LA FOTO
  public seleccionarFotoo(file: File) {
    this.fotoUpload = file;
    if (!file) {
      return this.imgTemp;
    }
    if (this.fotoUpload.type.indexOf("image") < 0) {
      this.fotoUpload = null;
      Swal.fire(
        "Error al seleccionar la foto:",
        "El archivo debe ser del tipo imagen",
        "error"
      );
      return (this.imgTemp = "../../../../assets/imgapp/image.png");
    }
    if (this.persona.fotoHashCode) {
      this.persona.fotoHashCode = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  //NAVEGAR LISTA PERSONAS
  irListaPersonas() {
    this.router.navigateByUrl("/dashboard/personas");
  }

  cargarPersona(id: number) {
    if (!id) {
      return;
    }
    this.personaService.getPersonaById(id).subscribe((persona) => {
      if (!persona) {
        return this.irListaPersonas();
      }
      this.persona = persona;
    });
  }
}
