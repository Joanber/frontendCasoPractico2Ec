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
import { AuthGuard } from "../guards/auth.guard";
import { NotificationsComponent } from "./notifications/notifications.component";
import { InformacionComponent } from "./informacion/informacion.component";
/* import { ConvocatoriaComponent } from "./gestion-ppp/convocatoria/convocatoria.component";
import { SeleccionEstudiantesComponent } from "./gestion-ppp/seleccion-estudiantes/seleccion-estudiantes.component";
import { DesignarTutorAcademicoComponent } from "./gestion-ppp/designar-tutor-academico/designar-tutor-academico.component";
import { GenararActaComponent } from "./gestion-ppp/genarar-acta/genarar-acta.component"; */

const routes: Routes = [
  {
    path: "dashboard",
    component: PagesComponent,
    canActivate: [AuthGuard],

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
      {
        path: "notifications",
        component: NotificationsComponent,
        data: { titulo: "Notificaciones" },
      },
      {
        path: "soli/:informacion",
        component: InformacionComponent,
        data: { titulo: "Informacion" },
      } /* ,
      {
        path: "convocatorias",
        component: ConvocatoriaComponent,
        data: { titulo: "Convocatoria Practicas Pre Profesionales" },
      },
      {
        path: "seleccionestudiantes",
        component: SeleccionEstudiantesComponent,
        data: { titulo: "Seleccion Estudiantes" },
      },
      {
        path: "designarTutorAcademico",
        component: DesignarTutorAcademicoComponent,
        data: { titulo: "Designar Tutor Academico" },
      },
      {
        path: "generarActa",
        component: GenararActaComponent,
        data: { titulo: "Acta" },
      } */,
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
