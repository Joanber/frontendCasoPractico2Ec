import { Component } from "@angular/core";
import { UsuarioService } from "src/app/services/services.models/usuario.service";
import { SidebarService } from "src/app/services/sidebar/sidebar.service";
import { environment } from "src/environments/environment";
const bd_url = environment.bd_url;
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
  public bd_url = bd_url + "/personas";
  public menuItems: any[];

  constructor(
    public sidebarService: SidebarService,
    public usuarioService: UsuarioService
  ) {
    this.menuItems = sidebarService.menu;
  }

  hasPermision(roles: any[]): boolean {
    if (roles) {
      return this.usuarioService.hasRoles(roles);
    }
    return true;
  }
}
