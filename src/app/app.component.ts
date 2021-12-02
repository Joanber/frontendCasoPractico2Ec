import { Component } from "@angular/core";
import { hammerjs } from "node_modules/hammerjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  hamerjs = hammerjs;
  title = "frontend-sv";
}
