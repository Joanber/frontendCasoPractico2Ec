import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-anexos",
  templateUrl: "./anexos.component.html",
  styleUrls: ["./anexos.component.css"],
})
export class AnexosComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {}

  getAnexo() {
    return this.route.url._value[1].path;
  }

  getStudents() {
    return [
      {
        id: "0104640974",
        names: "Michael Anthony",
        last: "Padilla Heredia",
        email: "michael.padilla.est@tecazuay.edu.ec",
        phone: "0996082041",
      },
      {
        id: "0104640974",
        names: "Jose Anthony",
        last: "Perez Hernesto",
        email: "michael.padilla.est@tecazuay.edu.ec",
        phone: "0996082041",
      },
      {
        id: "0104640974",
        names: "Pedro Mauricio",
        last: "Ordonez Salto",
        email: "michael.padilla.est@tecazuay.edu.ec",
        phone: "0996082041",
      },
    ];
  }
}
