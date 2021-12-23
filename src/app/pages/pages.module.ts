import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule, MatPaginatorModule, MatSortModule } from "@angular/material";
import {
  MatMomentDateModule,
  MomentDateModule
} from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { NgSelectModule } from "@ng-select/ng-select";
import { AppRoutingModule } from "../app-routing.module";
import { SharedModule } from "../shared/shared.module";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { AddCarreraComponent } from "./add-carrera/add-carrera.component";
import { ConvocatoriaComponent } from "./add-convocatoria/convocatoria.component";
import { DesignarTutorAcademicoComponent } from "./add-designar-tutor-academico/designar-tutor-academico.component";
import { AddDocenteComponent } from "./add-docente/add-docente.component";
import { AddEmpresaComponent } from "./add-empresa/add-empresa.component";
import { GenararActaComponent } from "./add-genarar-acta/genarar-acta.component";
import { AddPersonaComponent } from "./add-persona/add-persona.component";
import { AnexosComponent } from "./anexos/anexos.component";
import { AsistenciasComponent } from './asistencias/asistencias.component';
import { ConsultasReportesPppComponent } from "./consultas-reportes-ppp/consultas-reportes-ppp.component";
import { ConvocatoriasAbiertasComponent } from './convocatorias-abiertas/convocatorias-abiertas.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AcreditacionPppComponent } from "./gestion-vinculacion/acreditacion-ppp/acreditacion-ppp.component";
import { RegistroConveniosComponent } from "./gestion-vinculacion/convenio/add-edit_convenios/registro-convenios.component";
import { ListConveniosComponent } from "./gestion-vinculacion/convenio/list-convenios/list-convenios.component";
import { EstadoProcesosPppComponent } from "./gestion-vinculacion/estado-procesos-ppp/estado-procesos-ppp.component";
import { HistorialProcesosPppComponent } from "./gestion-vinculacion/historial-procesos-ppp/historial-procesos-ppp.component";
import { InformacionComponent } from "./informacion/informacion.component";
import { InformeComponent } from './informe/informe.component';
import { ListCarrerasComponent } from "./list-carreras/list-carreras.component";
import { ListConvocatoriasComponent } from "./list-convocatorias/list-convocatorias.component";
import { ListDocenteComponent } from "./list-docente/list-docente.component";
import { ListEmpresaComponent } from "./list-empresa/list-empresa.component";
import { ListEmpresasComponent } from "./list-empresas/list-empresas.component";
import { ListInfoCarreraComponent } from "./list-infocarrera/list-infocarrera.component";
import { ListInfoConvocatoriaComponent } from "./list-infoconvocatoria/list-infoconvocatoria.component";
import { ListPersonasComponent } from "./list-personas/list-personas.component";
import { ListSolicitudesEmpresasRespppComponent } from "./list-solicitudes-empresas-resppp/list-solicitudes-empresas-resppp.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { PagesComponent } from "./pages.component";
import { ProfileComponent } from "./profile/profile.component";
import { SolicitudComponent } from './solicitud/solicitud.component';
import { ListSolicitudesAlumnosComponent } from './list-solicitudes-alumnos/list-solicitudes-alumnos.component';
import { SeleccionarAlumnosComponent } from "./add-seleccionar-alumnos/seleccionar-alumnos.component";





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
    InformacionComponent,
    ConvocatoriaComponent,
    DesignarTutorAcademicoComponent,
    GenararActaComponent,
    ConsultasReportesPppComponent,
    RegistroConveniosComponent,
    AcreditacionPppComponent,
    EstadoProcesosPppComponent,
    HistorialProcesosPppComponent,
    ProfileComponent,
    ListConveniosComponent,
    ListInfoCarreraComponent,
    AddDocenteComponent,
    AddEmpresaComponent,
    ListEmpresaComponent,
    ListDocenteComponent,
    ListSolicitudesEmpresasRespppComponent,
    ListConvocatoriasComponent,
    ListInfoConvocatoriaComponent,
    SolicitudComponent,
    AsistenciasComponent,
    InformeComponent,
    ConvocatoriasAbiertasComponent,
    ListSolicitudesAlumnosComponent,
   SeleccionarAlumnosComponent

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
    MatSelectModule,
    MomentDateModule,
    MatDividerModule,
    NgSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule, MatIconModule, MatCardModule, MatSortModule
  ],
})
export class PagesModule {}
