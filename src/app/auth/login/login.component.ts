import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Usuario } from "src/app/models/usuario.model";
import { UsuarioService } from "src/app/services/services.models/usuario.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public usuario: Usuario;
  public formSubmitted = false;
  public auth2: any;
  public loginForm = this.fb.group({
    username: [localStorage.getItem("username") || "", [Validators.required]],
    password: ["", Validators.required],
    remember: [false],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.usuario = new Usuario();
  }
  ngOnInit(): void {}

  login() {
    let username = this.loginForm.get("username").value;
    let password = this.loginForm.get("password").value;
    if (username === "" || password === "") {
      Swal.fire("Login Fallido", "Username y/o Password vacías", "error");
      return;
    } else {
      this.usuarioService.login(username, password).subscribe(
        (response) => {
          this.usuarioService.guardarUsuario(response);
          this.usuarioService.guardarToken(response.accessToken);
          if (this.loginForm.get("remember").value) {
            localStorage.setItem(
              "username",
              this.loginForm.get("username").value
            );
          } else {
            localStorage.removeItem("username");
          }
          this.router.navigateByUrl("/");
        },
        (err) => {
          if (err.status == 500) {
            this.usuario.username = null;
            this.usuario.password = null;
            Swal.fire(
              "Login Fallido",
              "Username y/o Password incorrectas",
              "error"
            );
            return;
          }
        }
      );
    }
  }
}
