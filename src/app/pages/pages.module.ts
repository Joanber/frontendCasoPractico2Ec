import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { NgSelectModule } from "@ng-select/ng-select";
import { AppRoutingModule } from "../app-routing.module";
import { SharedModule } from "../shared/shared.module";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { AddCarreraComponent } from "./add-carrera/add-carrera.component";
import { AddCertificadoEstudianteEmpresaComponent } from "./add-certificado-estudiante-empresa/add-certificado-estudiante-empresa.component";
import { ConvocatoriaComponent } from "./add-convocatoria/convocatoria.component";
import { DesignarTutorAcademicoComponent } from "./add-designar-tutor-academico/designar-tutor-academico.component";
import { AddDocenteComponent } from "./add-docente/add-docente.component";
import { AddEmpresaComponent } from "./add-empresa/add-empresa.component";
import { AddEvaluacionEstudianteEmpresaComponent } from "./add-evaluacion-estudiante-empresa/add-evaluacion-estudiante-empresa.component";
import { GenararActaComponent } from "./add-genarar-acta/genarar-acta.component";
import { AddResponsablePPPComponent } from "./add-responsable-ppp/add-responsable-ppp.component";
import { AddSolicitudEstudianteComponent } from "./add-solicitud-estudiante/add-solicitud-estudiante.component";
import { AddValidacionSeleccionComponent } from "./add-validacion-seleccion/add-validacion-seleccion.component";
import { AnexosComponent } from "./anexos/anexos.component";
import { AsistenciasComponent } from "./asistencias/asistencias.component";
import { ConsultasReportesPppComponent } from "./consultas-reportes-ppp/consultas-reportes-ppp.component";
import { ConvocatoriasAbiertasComponent } from "./convocatorias-abiertas/convocatorias-abiertas.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AddDesignacionTeComponent } from "./gestion-empresa/add-designacion-te/add-designacion-te.component";
import { ListConvocatoriasValidasComponent } from "./gestion-empresa/list-convocatorias-validas/list-convocatorias-validas.component";
import { AddSeguimientoComponent } from "./gestion-tutor-academico/add-seguimiento/add-seguimiento.component";
import { ListSeguimientosComponent } from "./gestion-tutor-academico/list-seguimientos/list-seguimientos.component";
import {
  AcreditacionPppComponent,
  DialogAcreditacionComponent,
} from "./gestion-vinculacion/acreditacion-ppp/acreditacion-ppp.component";
import { RegistroConveniosComponent } from "./gestion-vinculacion/convenio/add-edit_convenios/registro-convenios.component";
import { ListConveniosComponent } from "./gestion-vinculacion/convenio/list-convenios/list-convenios.component";
import { EstadoProcesosPppComponent } from "./gestion-vinculacion/estado-procesos-ppp/estado-procesos-ppp.component";
import { HistorialProcesosPppComponent } from "./gestion-vinculacion/historial-procesos-ppp/historial-procesos-ppp.component";
import { InformacionComponent } from "./informacion/informacion.component";
import { InformeComponent } from "./informe/informe.component";
import { ListCarrerasComponent } from "./list-carreras/list-carreras.component";
import { ListConvocatoriasComponent } from "./list-convocatorias/list-convocatorias.component";
import { ListDocenteComponent } from "./list-docente/list-docente.component";
import { ListEmpresaComponent } from "./list-empresa/list-empresa.component";
import { ListEstudiantesAsignadosComponent } from "./list-estudiantes-asignados/list-estudiantes-asignados.component";
import { ListInfoCarreraComponent } from "./list-infocarrera/list-infocarrera.component";
import { ListInfoConvocatoriaComponent } from "./list-infoconvocatoria/list-infoconvocatoria.component";
import { ListInfoProcesosComponent } from "./list-infoprocesos/list-infoprocesos.component";
import { ListResponsablePPPComponent } from "./list-responsable-ppp/list-responsable-ppp.component";
import { ListSeleccionEstEmpComponent } from "./list-Respuesa-emp-est/list-seleccion-est-emp.component";
import { SeleccionarAlumnosComponent } from "./list-solicitudes-alumnos-empresa/seleccionar-alumnos.component";
import { ListSolicitudesAlumnosComponent } from "./list-solicitudes-alumnos/list-solicitudes-alumnos.component";
import { ListSolicitudesEmpresasRespppComponent } from "./list-solicitudes-empresas-resppp/list-solicitudes-empresas-resppp.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { PagesComponent } from "./pages.component";
import { ProfileComponent } from "./profile/profile.component";
import { SolicitudComponent } from "./solicitud/solicitud.component";
import { MatStepperModule } from "@angular/material/stepper";
import { MatRadioModule } from "@angular/material/radio";
import { MatExpansionModule } from "@angular/material/expansion";
import { ListActaComponent } from "./list-acta/list-acta.component";
import { ListUsuariosComponent } from "./personal/list-usuarios/list-usuarios.component";
import { AddUsuarioComponent } from "./personal/add-usuario/add-usuario.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatDatepickerModule,
  MatPaginatorModule,
  MatSortModule,
} from "@angular/material";
import {
  MatMomentDateModule,
  MomentDateModule,
} from "@angular/material-moment-adapter";
import { ListPersonasComponent } from "./personal/list-personas/list-personas.component";
import { ListSolicitudEmpresaComponent } from "./gestion-empresa/list-solicitud-empresa/list-solicitud-empresa.component";
import { AddPersonaComponent } from "./personal/add-persona/add-persona.component";
import { AddSolicitudEmpresaComponent } from "./gestion-empresa/add-solicitud-empresa/add-solicitud-empresa.component";
import { NgModule } from "@angular/core";
import { ListEvaluacionEstudianteEmpresaComponent } from './list-evaluacion-estudiante-empresa/list-evaluacion-estudiante-empresa.component';
import { ListCertificadoEstudianteEmpresaComponent } from './list-certificado-estudiante-empresa/list-certificado-estudiante-empresa.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PagesComponent,
    AccountSettingsComponent,
    ListPersonasComponent,
    AddPersonaComponent,
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
    ListInfoProcesosComponent,
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
    SeleccionarAlumnosComponent,
    ListResponsablePPPComponent,
    AddResponsablePPPComponent,
    AddSolicitudEmpresaComponent,
    ListSolicitudEmpresaComponent,
    AddValidacionSeleccionComponent,
    ListConvocatoriasValidasComponent,
    AddDesignacionTeComponent,
    ListSeleccionEstEmpComponent,
    ListEstudiantesAsignadosComponent,
    AddEvaluacionEstudianteEmpresaComponent,
    AddCertificadoEstudianteEmpresaComponent,
    ListSeguimientosComponent,
    AddSeguimientoComponent,
    AddSolicitudEstudianteComponent,
    DialogAcreditacionComponent,
    ListUsuariosComponent,
    AddUsuarioComponent,
    AddSolicitudEstudianteComponent,
    DialogAcreditacionComponent,
    ListActaComponent,
    ListEvaluacionEstudianteEmpresaComponent,
    ListCertificadoEstudianteEmpresaComponent,
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
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatSortModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatDialogModule,
    MatStepperModule,
    MatRadioModule,
    MatExpansionModule,
  ],
  entryComponents: [DialogAcreditacionComponent],
})
export class PagesModule {}
