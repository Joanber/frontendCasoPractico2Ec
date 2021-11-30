import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  logout() {}
  buscar(termino: string) {
    if (termino.length === 0) {
      return;
    }
  }
}
