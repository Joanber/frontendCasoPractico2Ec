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
}
