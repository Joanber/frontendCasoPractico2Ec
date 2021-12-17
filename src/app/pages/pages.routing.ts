import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { AddCarreraComponent } from "./add-carrera/add-carrera.component";
import { ConvocatoriaComponent } from "./add-convocatoria/convocatoria.component";
import { DesignarTutorAcademicoComponent } from "./add-designar-tutor-academico/designar-tutor-academico.component";
import { SeleccionEstudiantesComponent } from "./add-estudiantes-aceptados/seleccion-estudiantes.component";
import { GenararActaComponent } from "./add-genarar-acta/genarar-acta.component";
import { AddPersonaComponent } from "./add-persona/add-persona.component";
import { AnexosComponent } from "./anexos/anexos.component";
import { ConsultasReportesPppComponent } from "./consultas-reportes-ppp/consultas-reportes-ppp.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AcreditacionPppComponent } from './gestion-vinculacion/acreditacion-ppp/acreditacion-ppp.component';
import { RegistroConveniosComponent } from "./gestion-vinculacion/convenio/add-edit_convenios/registro-convenios.component";
import { ListConveniosComponent } from "./gestion-vinculacion/convenio/list-convenios/list-convenios.component";
import { EstadoProcesosPppComponent } from './gestion-vinculacion/estado-procesos-ppp/estado-procesos-ppp.component';
import { HistorialProcesosPppComponent } from './gestion-vinculacion/historial-procesos-ppp/historial-procesos-ppp.component';
import { InformacionComponent } from "./informacion/informacion.component";
import { ListCarrerasComponent } from "./list-carreras/list-carreras.component";
import { ListEmpresasComponent } from "./list-empresas/list-empresas.component";
import { ListPersonasComponent } from "./list-personas/list-personas.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { PagesComponent } from "./pages.component";
import { ProfileComponent } from "./profile/profile.component";



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
        path: "perfil",
        component: ProfileComponent,
        data: { titulo: "Mi Perfil" },
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
        path: "notifications/:id",
        component: NotificationsComponent,
        data: { titulo: "Notificacion" },
      },
      {
        path: "soli/:informacion",
        component: InformacionComponent,
        data: { titulo: "Informacion" },
      },
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
      },
      {
        path: "consultas-reportes",
        component: ConsultasReportesPppComponent,
        data: { titulo: "Consultas Reportes" },
      },
      {
        path: 'convenios',
        component: ListConveniosComponent,
        data: {
          titulo: 'Convenios'
        }
      },
      {
        path: 'convenios/registro-convenio',
        component: RegistroConveniosComponent,
        data: {
          titulo: 'Registro de Convenio'
        }
      },
      {
        path: 'convenio/:id',
        component: RegistroConveniosComponent,
        data: { titulo: 'Actualizar convenio' },
      },
      {
        path: 'acreditacion-ppp',
        component: AcreditacionPppComponent,
        data: {
          titulo: 'Informe de acreditación de PPP'
        }
      },
      {
        path: 'estado-procesos-ppp',
        component: EstadoProcesosPppComponent,
        data: {
          titulo: 'Estado de procesos PPP'
        }
      },
      {
        path: 'historial-procesos-ppp',
        component: HistorialProcesosPppComponent,
        data: { titulo: 'Historial de procesos PPP' }
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
