import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Persona } from "src/app/models/persona.model";
import { Rol } from "src/app/models/rol.models";
import { Usuario } from "src/app/models/usuario.model";
import { PersonaService } from "src/app/services/services.models/persona.service";
import { UsuarioService } from "src/app/services/services.models/usuario.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-usuario",
  templateUrl: "./add-usuario.component.html",
  styleUrls: ["./add-usuario.component.css"],
})
export class AddUsuarioComponent implements OnInit {
  public usuario = new Usuario();
  public personas: Persona[] = [];
  public roles: Rol[] = [];
  public formSubmitted = false;
  public fieldTextType: boolean;
  public repeatFieldTextType: boolean;
  public isError = false;
  public existe = false;
  public existeUsername = false;
  public mensaje: string;
  public mostrarInputPass = true;
  constructor(
    private usuarioService: UsuarioService,
    private personaService: PersonaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.cargarPersonas();
    this.cargarRoles();
    this.activatedRoute.params.subscribe(({ id }) => this.cargarUsuario(id));
  }

  guardarUsuario(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.usuario.roles.length > 0) {
      if (this.usuario.id) {
        this.usuario.username = this.usuario.persona.identificacion;
        this.usuarioService
          .editar(this.usuario, this.usuario.id)
          .subscribe((usuario) => {
            this.irListaUsuarios();
            Swal.fire(
              "Actualizar Usuario",
              `Usuario actualizado con exito!`,
              "success"
            );
          });
      } else {
        this.usuario.username = this.usuario.persona.identificacion;
        this.usuarioService.crear(this.usuario).subscribe((usuario) => {
          this.irListaUsuarios();
          Swal.fire("Nuevo Usuario", `Usuario creado con exito!`, "success");
        });
      }
    }
  }

  cargarPersonas() {
    this.personaService
      .getPersonas()
      .subscribe((personas) => (this.personas = personas));
  }

  //NAVEGAR LISTA USUARIOS
  irListaUsuarios() {
    this.router.navigateByUrl("/dashboard/usuarios");
  }

  cargarUsuario(id: number) {
    if (!id) {
      this.mostrarInputPass = true;
      return;
    }
    this.usuarioService.getUsuarioById(id).subscribe((usuario) => {
      if (!usuario) {
        return this.irListaUsuarios();
      }
      this.usuario = usuario;
      this.mostrarInputPass = false;
      this.usuarioService.getUsuarioById(id).subscribe((usuario) => {
        this.usuario = usuario;
        for (let rol1 of this.usuario.roles) {
          for (let rol2 of this.roles) {
            if (rol1.id === rol2.id) {
              rol2.check = true;
            }
          }
        }
      });
    });
  }
  compararPersona(d1: Persona, d2: Persona) {
    if (d1 === undefined && d2 === undefined) {
      return true;
    }
    return d1 == null || d2 == null ? false : d1.id === d2.id;
  }
  public toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  public toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }
  cargarRoles() {
    this.usuarioService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });
  }
  public onChange(event, rol: Rol) {
    const checked = event.target.checked;
    if (checked) {
      this.usuario.roles.push(rol);
    } else {
      this.usuario.roles = this.usuario.roles.filter(
        (r) => r.nombre != rol.nombre
      );
    }
  }
  private onIsError(): void {
    this.isError = true;
    setTimeout(() => {
      this.isError = false;
    }, 1000);
  }
}
