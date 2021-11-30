import { Component, OnInit } from "@angular/core";
import { SettingsService } from "../services/settings/settings.service";
declare function customInitFuctions();
@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.css"],
})
export class PagesComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    customInitFuctions();
  }
}
