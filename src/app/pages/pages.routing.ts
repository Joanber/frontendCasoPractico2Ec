import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { ListPersonasComponent } from "./list-personas/list-personas.component";
import { AddPersonaComponent } from "./add-persona/add-persona.component";
import { ListEmpresasComponent } from "./list-empresas/list-empresas.component";
import { AnexosComponent } from "./anexos/anexos.component";
import { ListCarrerasComponent } from "./list-carreras/list-carreras.component";
import { AddCarreraComponent } from "./add-carrera/add-carrera.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: PagesComponent,

    children: [
      {
        path: "",
        component: DashboardComponent,
        data: { titulo: "Dashboard" },
      },
      {
        path: "account-settings",
        component: AccountSettingsComponent,
        data: { titulo: "Ajustes de cuenta" },
      },
      {
        path: "personas",
        component: ListPersonasComponent,
        data: { titulo: "Personas" },
      },
      {
        path: "nueva-persona",
        component: AddPersonaComponent,
        data: { titulo: "Nueva Persona" },
      },
      {
        path: "actualizar-persona/:id",
        component: AddPersonaComponent,
        data: { titulo: "Actualizar Persona" },
      },
      {
        path: "empresas",
        component: ListEmpresasComponent,
        data: { titulo: "Empresas" },
      },
      {
        path: "carreras",
        component: ListCarrerasComponent,
        data: { titulo: "Carreras" },
      },
      {
        path: "nueva-carrera",
        component: AddCarreraComponent,
        data: { titulo: "Nueva Carrera" },
      },
      {
        path: "actualizar-carrera/:id",
        component: AddCarreraComponent,
        data: { titulo: "Actualizar Carrera" },
      },

      {
        path: "solicitar/:anexo",
        component: AnexosComponent,
        data: { titulo: "Anexos Gestion Empresa" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
