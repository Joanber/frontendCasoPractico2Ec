import { Component, OnInit } from "@angular/core";
import { hammerjs } from "node_modules/hammerjs";
declare function customInitFuctions();

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  hamerjs = hammerjs;
  title = "frontend-sv";
  ngOnInit() {
    customInitFuctions();
  }
}
