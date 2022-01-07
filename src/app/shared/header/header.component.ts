import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsuarioService } from "src/app/services/services.models/usuario.service";
import { environment } from "src/environments/environment";
const bd_url = environment.bd_url;
import { getNotificationsOfUser } from "./../../utils/api";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  public bd_url = bd_url + "/personas";
  constructor(public usuarioService: UsuarioService, private router: Router) {}
  public notifications = [];

  ngOnInit() {
    this.setAllNotifications();
  }

  logout() {
    this.usuarioService.logout();
    this.router.navigate(["/login"]);
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return;
    }
  }

  async setAllNotifications() {
    this.notifications = await getNotificationsOfUser();
  }
}
