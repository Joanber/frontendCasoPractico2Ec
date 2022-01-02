import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { AddCarreraComponent } from "./add-carrera/add-carrera.component";
import { ConvocatoriaComponent } from "./add-convocatoria/convocatoria.component";
import { DesignarTutorAcademicoComponent } from "./add-designar-tutor-academico/designar-tutor-academico.component";
import { GenararActaComponent } from "./add-genarar-acta/genarar-acta.component";
import { AddPersonaComponent } from "./add-persona/add-persona.component";
import { AnexosComponent } from "./anexos/anexos.component";
import { ConsultasReportesPppComponent } from "./consultas-reportes-ppp/consultas-reportes-ppp.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AcreditacionPppComponent } from "./gestion-vinculacion/acreditacion-ppp/acreditacion-ppp.component";
import { RegistroConveniosComponent } from "./gestion-vinculacion/convenio/add-edit_convenios/registro-convenios.component";
import { ListConveniosComponent } from "./gestion-vinculacion/convenio/list-convenios/list-convenios.component";
import { EstadoProcesosPppComponent } from "./gestion-vinculacion/estado-procesos-ppp/estado-procesos-ppp.component";
import { HistorialProcesosPppComponent } from "./gestion-vinculacion/historial-procesos-ppp/historial-procesos-ppp.component";
import { InformacionComponent } from "./informacion/informacion.component";
import { ListCarrerasComponent } from "./list-carreras/list-carreras.component";
import { ListPersonasComponent } from "./list-personas/list-personas.component";
import { ListInfoCarreraComponent } from "./list-infocarrera/list-infocarrera.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { PagesComponent } from "./pages.component";
import { ProfileComponent } from "./profile/profile.component";
import { ListSolicitudesEmpresasRespppComponent } from "./list-solicitudes-empresas-resppp/list-solicitudes-empresas-resppp.component";
import { ListConvocatoriasComponent } from "./list-convocatorias/list-convocatorias.component";
import { ListInfoConvocatoriaComponent } from "./list-infoconvocatoria/list-infoconvocatoria.component";
import { SolicitudComponent } from "./solicitud/solicitud.component";
import { AsistenciasComponent } from "./asistencias/asistencias.component";
import { InformeComponent } from "./informe/informe.component";
import { ConvocatoriasAbiertasComponent } from "./convocatorias-abiertas/convocatorias-abiertas.component";
import { ListDocenteComponent } from "./list-docente/list-docente.component";
import { AddDocenteComponent } from "./add-docente/add-docente.component";
import { ListSolicitudesAlumnosComponent } from "./list-solicitudes-alumnos/list-solicitudes-alumnos.component";
import { AddEmpresaComponent } from "./add-empresa/add-empresa.component";

import { AddResponsablePPPComponent } from "./add-responsable-ppp/add-responsable-ppp.component";
import { ListResponsablePPPComponent } from "./list-responsable-ppp/list-responsable-ppp.component";
import { ListEmpresaComponent } from "./list-empresa/list-empresa.component";
import { AddSolicitudEmpresaComponent } from "./add-solicitud-empresa/add-solicitud-empresa.component";
import { ListSolicitudEmpresaComponent } from "./list-solicitud-empresa/list-solicitud-empresa.component";
import { AddValidacionSeleccionComponent } from "./add-validacion-seleccion/add-validacion-seleccion.component";
import { ListConvocatoriasValidasComponent } from "./gestion-empresa/list-convocatorias-validas/list-convocatorias-validas.component";
import { AddDesignacionTeComponent } from "./gestion-empresa/add-designacion-te/add-designacion-te.component";
import { ListInfoProcesosComponent } from "./list-infoprocesos/list-infoprocesos.component";
import { SeleccionarAlumnosComponent } from "./list-solicitudes-alumnos-empresa/seleccionar-alumnos.component";
import { ListSeleccionEstEmpComponent } from "./list-Respuesa-emp-est/list-seleccion-est-emp.component";
import { ListEstudiantesAsignadosComponent } from "./list-estudiantes-asignados/list-estudiantes-asignados.component";
import { AddEvaluacionEstudianteEmpresaComponent } from "./add-evaluacion-estudiante-empresa/add-evaluacion-estudiante-empresa.component";
import { AddCertificadoEstudianteEmpresaComponent } from "./add-certificado-estudiante-empresa/add-certificado-estudiante-empresa.component";
import { AddSeguimientoComponent } from "./gestion-tutor-academico/add-seguimiento/add-seguimiento.component";
import { ListSeguimientosComponent } from "./gestion-tutor-academico/list-seguimientos/list-seguimientos.component";
import { AddSolicitudEstudianteComponent } from "./add-solicitud-estudiante/add-solicitud-estudiante.component";

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
        path: "infoprocesos",
        component: ListInfoProcesosComponent,
        data: { titulo: "Informacion de Procesos" },
      },
      {
        path: "infocarrera",
        component: ListInfoCarreraComponent,
        data: { titulo: "Informacion de Carreras" },
      },
      {
        path: "infoconvocatoria",
        component: ListInfoConvocatoriaComponent,
        data: { titulo: "Informacion de Convocatorias" },
      },
      {
        path: "nueva-convocatoria/:id",
        component: ConvocatoriaComponent,
        data: { titulo: "Nueva Convocatoria Practicas Pre Profesionales" },
      },
      {
        path: "actualizar-convocatoria/:idc",
        component: ConvocatoriaComponent,
        data: { titulo: "Convocatoria Practicas Pre Profesionales" },
      },
      {
        path: "convocatorias",
        component: ListConvocatoriasComponent,
        data: { titulo: "Convocatorias" },
      },
      {
        path: "solicitudes-recibidas/:id",
        component: SeleccionarAlumnosComponent,
        data: { titulo: "Solicitudes recibidas de estudiantes" },
      },
      {
        path: "seleccion-estudiantes-convocatorias/:id",
        component: AddValidacionSeleccionComponent,
        data: { titulo: "Responder a empresa eleccion estudiantes " },
      },
      {
        path: "actualizar-seleccion-estudiantes-convocatorias/:idc",
        component: AddValidacionSeleccionComponent,
        data: { titulo: "Responder a empresa eleccion estudiantes " },
      },
      {
        path: "respuestas-empresas",
        component: ListSeleccionEstEmpComponent,
        data: { titulo: "Respuestas  a Empresas" },
      },
      {
        path: "nueva-designacion-ta/:id/:ida",
        component: DesignarTutorAcademicoComponent,
        data: { titulo: "Designar Tutor Academico" },
      },
      {
        path: "actualizar-designacion-ta/:idd",
        component: DesignarTutorAcademicoComponent,
        data: { titulo: "Actualizar Tutor Academico" },
      },
      {
        path: "generar-acta/:id/:ida",
        component: GenararActaComponent,
        data: { titulo: "Acta" },
      },
      {
        path: "generarActa",
        component: GenararActaComponent,
        data: { titulo: "Acta" },
      },
      {
        path: "consultas-reportes",
        component: ConsultasReportesPppComponent,
        data: { titulo: "Consultas Reportes Tutores" },
      },
      {
        path: "convenios",
        component: ListConveniosComponent,
        data: {
          titulo: "Convenios",
        },
      },
      {
        path: "convenios/registro-convenio",
        component: RegistroConveniosComponent,
        data: {
          titulo: "Registro de Convenio",
        },
      },
      {
        path: "convenio/:id",
        component: RegistroConveniosComponent,
        data: { titulo: "Actualizar convenio" },
      },
      {
        path: "acreditacion-ppp",
        component: AcreditacionPppComponent,
        data: {
          titulo: "Informe de acreditación de PPP",
        },
      },
      {
        path: "estado-procesos-ppp",
        component: EstadoProcesosPppComponent,
        data: {
          titulo: "Estado de procesos PPP",
        },
      },
      {
        path: "historial-procesos-ppp",
        component: HistorialProcesosPppComponent,
        data: { titulo: "Historial de procesos PPP" },
      },
      {
        path: "solicitud/:id",
        component: SolicitudComponent,
        data: { titulo: "Crear Solicitud de Estudiantes" },
      },

      {
        path: "convocatoriasabiertas",
        component: ConvocatoriasAbiertasComponent,
        data: { titulo: "Convocatorias Abiertas" },
      },
      {
        path: "asistencias",
        component: AsistenciasComponent,
        data: { titulo: "Registro de Asistencia" },
      },
      {
        path: "informe",
        component: InformeComponent,
        data: { titulo: "Informe Final" },
      },
      {
        path: "solicitudes_empresas",
        component: ListSolicitudesEmpresasRespppComponent,
        data: { titulo: "Lista solicitudes de las empresas" },
      },

      {
        path: "solicitudes_estudiantes",
        component: ListSolicitudesAlumnosComponent,
        data: { titulo: "Lista solicitudes de los estudiantes" },
      },

      {
        path: "docentes",
        component: ListDocenteComponent,
        data: { titulo: "Lista de Docentes" },
      },
      {
        path: "nuevo-docentes",
        component: AddDocenteComponent,
        data: { titulo: "Nuevo Docentes" },
      },

      {
        path: "actualizar-Docente/:id",
        component: AddDocenteComponent,
        data: { titulo: "Actualizar Docente" },
      },

      {
        path: "empresas",
        component: ListEmpresaComponent,
        data: { titulo: "Lista de Empresas" },
      },
      {
        path: "nueva-empresas",
        component: AddEmpresaComponent,
        data: { titulo: "Nuevo Empresas" },
      },
      {
        path: "actualizar-Empresa/:id",
        component: AddEmpresaComponent,
        data: { titulo: "Actualizar Empresa" },
      },

      {
        path: "add-solicitud-estudiante/:id",
        component: AddSolicitudEstudianteComponent,
        data: { titulo: "Actualizar Solicitud Estudiante" },
      },
      {
        path: "responsablesppp",
        component: ListResponsablePPPComponent,
        data: { titulo: "Lista de Responsables de Practicas Preprofesionales" },
      },
      {
        path: "nuevo-responsablesppp",
        component: AddResponsablePPPComponent,
        data: { titulo: "Nuevo responsablesppp" },
      },
      {
        path: "actualizar-responsablesppp/:id",
        component: AddResponsablePPPComponent,
        data: { titulo: "Actualizar responsablesppp" },
      },
      {
        path: "nueva-solicitud-empresa",
        component: AddSolicitudEmpresaComponent,
        data: { titulo: "Nueva Solicitud" },
      },
      {
        path: "list-solicitud-empresa",
        component: ListSolicitudEmpresaComponent,
        data: { titulo: "Lista Solicitudes Empresas" },
      },
      {
        path: "convocatorias-aprobadas",
        component: ListConvocatoriasValidasComponent,
        data: { titulo: "Designación de Tutores Empresariales" },
      },
      {
        path: "nueva-designacion-te/:id/:ida",
        component: AddDesignacionTeComponent,
        data: { titulo: " Nueva Designacion de Tutor Empresarial" },
      },
      {
        path: "actualizar-designacion-te/:idd",
        component: AddDesignacionTeComponent,
        data: { titulo: "Actualizar la Designacion de Tutor Empresarial" },
      },
      {
        path: "lista-estudiantes-asignados",
        component: ListEstudiantesAsignadosComponent,
        data: { titulo: "Estudiantes Asignados" },
      },
      {
        path: "evaluacion-estudiante-empresa",
        component: AddEvaluacionEstudianteEmpresaComponent,
        data: { titulo: "Evaluación a Estudiante" },
      },
      {
        path: "certificado-estudiante-empresa",
        component: AddCertificadoEstudianteEmpresaComponent,
        data: { titulo: "Certificado de Empresa" },
      },
      {
        path: "nuevo-seguimiento/:ida",
        component: AddSeguimientoComponent,
        data: { titulo: "Nuevo seguimiento" },
      },
      {
        path: "actualizar-seguimiento/:id",
        component: AddSeguimientoComponent,
        data: { titulo: "Nuevo seguimiento" },
      },
      {
        path: "seguimientos",
        component: ListSeguimientosComponent,
        data: { titulo: "Listado de seguimientos" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
