import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  private notifications = [];

  constructor() {}

  ngOnInit() {
    this.getAllNotifications();
  }

  logout() {}

  buscar(termino: string) {
    if (termino.length === 0) {
      return;
    }
  }

  async getAllNotifications() {
    let data = await fetch("http://localhost:8081/notification/all");
    this.notifications = await data.json();

    console.log(this.notifications);
  }
}
