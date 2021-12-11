import { Component, OnInit } from "@angular/core";
import { getAllNotifications } from "./../../utils/api";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  private notifications = [];

  constructor() {}

  ngOnInit() {
    this.setAllNotifications();
  }

  logout() {}

  buscar(termino: string) {
    if (termino.length === 0) {
      return;
    }
  }

  async setAllNotifications() {
    this.notifications = await getAllNotifications();
  }
}
