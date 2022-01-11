import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DesignacionTA } from "src/app/models/designacionta.model";
import { DesignacionTaService } from "src/app/services/services.models/designacion-ta.service";
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
  public designacionesTA: DesignacionTA[] = [];
  public roles: any = ["ROLE_ADMIN", "ROLE_TACADEMICO"];
  constructor(
    public usuarioService: UsuarioService,
    private router: Router,
    private designacionTAService: DesignacionTaService
  ) {}
  public notifications = [];

  ngOnInit() {
    this.cargarDesignacionesTA();
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

  public cargarDesignacionesTA() {
    this.designacionTAService
      .getDesiganacionesTA()
      .subscribe((designacionTA) => {
        this.designacionesTA = designacionTA;
      });
  }
}
