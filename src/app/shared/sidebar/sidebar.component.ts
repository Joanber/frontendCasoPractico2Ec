import { Component, OnInit } from "@angular/core";
import { SidebarService } from "src/app/services/sidebar/sidebar.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];

  constructor(public sidebarService: SidebarService) {
    this.menuItems = sidebarService.menu;
  }

  ngOnInit() {}
}
