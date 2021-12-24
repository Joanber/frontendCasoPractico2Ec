import { Component, OnInit } from "@angular/core";
import { LoaderService } from "../services/interceptores/loader.service";
import { SettingsService } from "../services/settings/settings.service";
declare function customInitFuctions();
@Component({
  selector: "app-pages",
  templateUrl: "./pages.component.html",
  styleUrls: ["./pages.component.css"],
})
export class PagesComponent implements OnInit {
  constructor(private settingsService: SettingsService, public loaderService: LoaderService) {}

  ngOnInit() {
    customInitFuctions();
  }
}
