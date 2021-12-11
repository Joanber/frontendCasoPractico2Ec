import { LOCALE_ID, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PagesComponent } from "./pages.component";
import { SharedModule } from "../shared/shared.module";
import { AppRoutingModule } from "../app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { ListPersonasComponent } from "./list-personas/list-personas.component";
import { AddPersonaComponent } from "./add-persona/add-persona.component";
import {
  MatAutocompleteModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
} from "@angular/material";
import {
  MatMomentDateModule,
  MomentDateModule,
} from "@angular/material-moment-adapter";
import { ListEmpresasComponent } from "./list-empresas/list-empresas.component";
import { AnexosComponent } from "./anexos/anexos.component";
import { ListCarrerasComponent } from "./list-carreras/list-carreras.component";
import { AddCarreraComponent } from "./add-carrera/add-carrera.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    ListPersonasComponent,
    AddPersonaComponent,
    ListEmpresasComponent,
    AnexosComponent,
    ListCarrerasComponent,
    AddCarreraComponent,
    NotificationsComponent,
  ],
  exports: [DashboardComponent, PagesComponent],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MomentDateModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    NgSelectModule,
  ],
})
export class PagesModule {}
