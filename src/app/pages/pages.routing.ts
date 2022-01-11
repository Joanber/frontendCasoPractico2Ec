import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { MODULO_ROLES } from "../services/services.models/usuario.service";
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
import { DetalleconvocatoriasComponent } from "./detalleconvocatorias/detalleconvocatorias.component";
import { AddDesignacionTeComponent } from "./gestion-empresa/add-designacion-te/add-designacion-te.component";
import { AddSolicitudEmpresaComponent } from "./gestion-empresa/add-solicitud-empresa/add-solicitud-empresa.component";
import { ListConvocatoriasValidasComponent } from "./gestion-empresa/list-convocatorias-validas/list-convocatorias-validas.component";
import { ListSolicitudEmpresaComponent } from "./gestion-empresa/list-solicitud-empresa/list-solicitud-empresa.component";
import { AddSeguimientoComponent } from "./gestion-tutor-academico/add-seguimiento/add-seguimiento.component";
import { AddVisitaComponent } from "./gestion-tutor-academico/add-visita/add-visita.component";
import { ListSeguimientosComponent } from "./gestion-tutor-academico/list-seguimientos/list-seguimientos.component";
import { ListVisitasComponent } from "./gestion-tutor-academico/list-visitas/list-visitas.component";
import { AcreditacionPppComponent } from "./gestion-vinculacion/acreditacion-ppp/acreditacion-ppp.component";
import { RegistroConveniosComponent } from "./gestion-vinculacion/convenio/add-edit_convenios/registro-convenios.component";
import { ListConveniosComponent } from "./gestion-vinculacion/convenio/list-convenios/list-convenios.component";
import { EstadoProcesosPppComponent } from "./gestion-vinculacion/estado-procesos-ppp/estado-procesos-ppp.component";
import { HistorialProcesosPppComponent } from "./gestion-vinculacion/historial-procesos-ppp/historial-procesos-ppp.component";
import { InformacionComponent } from "./informacion/informacion.component";
import { InformeComponent } from "./informe/informe.component";
import { ListActaComponent } from "./list-acta/list-acta.component";
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
import { AddPersonaComponent } from "./personal/add-persona/add-persona.component";
import { AddUsuarioComponent } from "./personal/add-usuario/add-usuario.component";
import { ListPersonasComponent } from "./personal/list-personas/list-personas.component";
import { ListUsuariosComponent } from "./personal/list-usuarios/list-usuarios.component";
import { ProfileComponent } from "./profile/profile.component";
import { SolicitudComponent } from "./solicitud/solicitud.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: PagesComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
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
        data: {
          titulo: "Personas",
          roles: MODULO_ROLES.MODULO_GESTION_PERSONAL,
        },
      },
      {
        path: "nueva-persona",
        component: AddPersonaComponent,
        data: {
          titulo: "Nueva Persona",
          roles: MODULO_ROLES.MODULO_GESTION_PERSONAL,
        },
      },
      {
        path: "actualizar-persona/:id",
        component: AddPersonaComponent,
        data: {
          titulo: "Actualizar Persona",
          roles: MODULO_ROLES.MODULO_GESTION_PERSONAL,
        },
      },

      {
        path: "carreras",
        component: ListCarrerasComponent,
        data: {
          titulo: "Carreras",
          roles: MODULO_ROLES.MODULO_GESTION_CARRERAS,
        },
      },
      {
        path: "nueva-carrera",
        component: AddCarreraComponent,
        data: {
          titulo: "Nueva Carrera",
          roles: MODULO_ROLES.MODULO_GESTION_CARRERAS,
        },
      },
      {
        path: "actualizar-carrera/:id",
        component: AddCarreraComponent,
        data: {
          titulo: "Actualizar Carrera",
          roles: MODULO_ROLES.MODULO_GESTION_CARRERAS,
        },
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
        data: {
          titulo: "Informacion",
        },
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
        path: "detalleconvocatorias/:id",
        component: DetalleconvocatoriasComponent,
        data: {
          titulo: "Detalle de Convocatorias",
          roles: MODULO_ROLES.MODULO_GESTION_PPP,
        },
      },

      {
        path: "nueva-convocatoria/:id",
        component: ConvocatoriaComponent,
        data: {
          titulo: "Nueva Convocatoria Practicas Pre Profesionales",
          roles: MODULO_ROLES.MODULO_GESTION_PPP,
        },
      },
      {
        path: "actualizar-convocatoria/:idc",
        component: ConvocatoriaComponent,
        data: {
          titulo: "Convocatoria Practicas Pre Profesionales",
          roles: MODULO_ROLES.MODULO_GESTION_PPP,
        },
      },
      {
        path: "convocatorias",
        component: ListConvocatoriasComponent,
        data: {
          titulo: "Convocatorias",
          roles: MODULO_ROLES.MODULO_GESTION_PPP,
        },
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
        data: {
          titulo: "Respuestas  a Empresas",
          roles: MODULO_ROLES.MODULO_GESTION_PPP,
        },
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
        path: "list-actas",
        component: ListActaComponent,
        data: { titulo: "Lista Actas", roles: MODULO_ROLES.MODULO_GESTION_PPP },
      },
      {
        path: "consultas-reportes",
        component: ConsultasReportesPppComponent,
        data: {
          titulo: "Consultas Reportes Tutores",
          roles: MODULO_ROLES.MODULO_GESTION_PPP,
        },
      },

      {
        path: "convenios",
        component: ListConveniosComponent,
        data: {
          titulo: "Convenios",
          roles: MODULO_ROLES.MODULO_VINCULACION,
        },
      },
      {
        path: "convenios/registro-convenio",
        component: RegistroConveniosComponent,
        data: {
          titulo: "Registro de Convenio",
          roles: MODULO_ROLES.MODULO_VINCULACION,
        },
      },
      {
        path: "convenio/:id",
        component: RegistroConveniosComponent,
        data: {
          titulo: "Actualizar convenio",
          roles: MODULO_ROLES.MODULO_VINCULACION,
        },
      },
      {
        path: "acreditacion-ppp",
        component: AcreditacionPppComponent,
        data: {
          titulo: "Informe de acreditación de PPP",
          roles: MODULO_ROLES.MODULO_VINCULACION,
        },
      },
      {
        path: "estado-procesos-ppp",
        component: EstadoProcesosPppComponent,
        data: {
          titulo: "Estado de procesos PPP",
          roles: MODULO_ROLES.MODULO_VINCULACION,
        },
      },
      {
        path: "historial-procesos-ppp",
        component: HistorialProcesosPppComponent,
        data: {
          titulo: "Historial de procesos PPP",
          roles: MODULO_ROLES.MODULO_VINCULACION,
        },
      },
      {
        path: "solicitud/:id",
        component: SolicitudComponent,
        data: { titulo: "Crear Solicitud de Estudiantes" },
      },

      {
        path: "convocatoriasabiertas",
        component: ConvocatoriasAbiertasComponent,
        data: {
          titulo: "Convocatorias Abiertas",
        },
      },
      {
        path: "asistencias",
        component: AsistenciasComponent,
        data: { titulo: "Registro de Asistencia" },
      },
      {
        path: "informe",
        component: InformeComponent,
        data: {
          titulo: "Informe Final",
        },
      },
      {
        path: "solicitudes_empresas",
        component: ListSolicitudesEmpresasRespppComponent,
        data: {
          titulo: "Lista solicitudes de las empresas",
          roles: MODULO_ROLES.MODULO_GESTION_PPP,
        },
      },

      {
        path: "solicitudes_estudiantes",
        component: ListSolicitudesAlumnosComponent,
        data: {
          titulo: "Lista solicitudes de los estudiantes",
          roles: MODULO_ROLES.MODULO_GESTION_ALUMNOS,
        },
      },

      {
        path: "docentes",
        component: ListDocenteComponent,
        data: {
          titulo: "Lista de Docentes",
          roles: MODULO_ROLES.MODULO_GESTION_CARRERAS,
        },
      },
      {
        path: "nuevo-docentes",
        component: AddDocenteComponent,
        data: {
          titulo: "Nuevo Docente",
          roles: MODULO_ROLES.MODULO_GESTION_CARRERAS,
        },
      },

      {
        path: "actualizar-Docente/:id",
        component: AddDocenteComponent,
        data: {
          titulo: "Actualizar Docente",
          roles: MODULO_ROLES.MODULO_GESTION_CARRERAS,
        },
      },

      {
        path: "empresas",
        component: ListEmpresaComponent,
        data: {
          titulo: "Lista de Empresas",
          roles: MODULO_ROLES.MODULO_GESTION_CARRERAS,
        },
      },
      {
        path: "nueva-empresas",
        component: AddEmpresaComponent,
        data: {
          titulo: "Nueva Empresa",
          roles: MODULO_ROLES.MODULO_GESTION_CARRERAS,
        },
      },
      {
        path: "actualizar-Empresa/:id",
        component: AddEmpresaComponent,
        data: {
          titulo: "Actualizar Empresa",
          roles: MODULO_ROLES.MODULO_GESTION_CARRERAS,
        },
      },

      {
        path: "add-solicitud-estudiante/:id",
        component: AddSolicitudEstudianteComponent,
        data: { titulo: "Actualizar Solicitud Estudiante" },
      },
      {
        path: "responsablesppp",
        component: ListResponsablePPPComponent,
        data: {
          titulo: "Lista de Responsables de Practicas Preprofesionales",
          roles: MODULO_ROLES.MODULO_GESTION_CARRERAS,
        },
      },
      {
        path: "nuevo-responsablesppp",
        component: AddResponsablePPPComponent,
        data: {
          titulo: "Nuevo (a) Responsables de Practicas Preprofesionales",
          roles: MODULO_ROLES.MODULO_GESTION_CARRERAS,
        },
      },
      {
        path: "actualizar-responsablesppp/:id",
        component: AddResponsablePPPComponent,
        data: {
          titulo: "Actualizar Responsables de Practicas Preprofesionales",
          roles: MODULO_ROLES.MODULO_GESTION_CARRERAS,
        },
      },
      {
        path: "nueva-solicitud-empresa",
        component: AddSolicitudEmpresaComponent,
        data: {
          titulo: "Nueva Solicitud",
          roles: MODULO_ROLES.MODULO_GESTION_EMPRESA,
        },
      },
      {
        path: "actualizar-solicitud-empresa/:id",
        component: AddSolicitudEmpresaComponent,
        data: {
          titulo: "Nueva Solicitud",
          roles: MODULO_ROLES.MODULO_GESTION_EMPRESA,
        },
      },
      {
        path: "list-solicitud-empresa",
        component: ListSolicitudEmpresaComponent,
        data: {
          titulo: "Lista Solicitudes Empresas",
          roles: MODULO_ROLES.MODULO_GESTION_EMPRESA,
        },
      },
      {
        path: "convocatorias-aprobadas",
        component: ListConvocatoriasValidasComponent,
        data: {
          titulo: "Designación de Tutores Empresariales",
          roles: MODULO_ROLES.MODULO_GESTION_EMPRESA,
        },
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
        data: {
          titulo: "Estudiantes Asignados",
          roles: MODULO_ROLES.MODULO_GESTION_EMPRESA,
        },
      },
      {
        path: "evaluacion-estudiante-empresa",
        component: AddEvaluacionEstudianteEmpresaComponent,
        data: {
          titulo: "Evaluación a Estudiante",
          roles: MODULO_ROLES.MODULO_GESTION_EMPRESA,
        },
      },
      {
        path: "certificado-estudiante-empresa",
        component: AddCertificadoEstudianteEmpresaComponent,
        data: {
          titulo: "Certificado de Empresa",
          roles: MODULO_ROLES.MODULO_GESTION_EMPRESA,
        },
      },
      {
        path: "nuevo-seguimiento/:ida",
        component: AddSeguimientoComponent,
        data: {
          titulo: "Nuevo seguimiento",
          roles: MODULO_ROLES.MODULO_GESTION_TUTOR_ACADEMICO,
        },
      },
      {
        path: "actualizar-seguimiento/:id",
        component: AddSeguimientoComponent,
        data: {
          titulo: "Nuevo seguimiento",
          roles: MODULO_ROLES.MODULO_GESTION_TUTOR_ACADEMICO,
        },
      },
      {
        path: "seguimientos",
        component: ListSeguimientosComponent,
        data: {
          titulo: "Listado de seguimientos",
          roles: MODULO_ROLES.MODULO_GESTION_TUTOR_ACADEMICO,
        },
      },
      {
        path: "usuarios",
        component: ListUsuariosComponent,
        data: {
          titulo: "Usuarios",
          roles: MODULO_ROLES.MODULO_GESTION_PERSONAL,
        },
      },
      {
        path: "nuevo-usuario",
        component: AddUsuarioComponent,
        data: {
          titulo: "Nuevo Usuario",
          roles: MODULO_ROLES.MODULO_GESTION_PERSONAL,
        },
      },
      {
        path: "actualizar-usuario/:id",
        component: AddUsuarioComponent,
        data: {
          titulo: "Actualizar Usuario",
          roles: MODULO_ROLES.MODULO_GESTION_PERSONAL,
        },
      },
      {
        path: "actualizar-visita/:id",
        component: AddVisitaComponent,
        data: {
          titulo: "Actualizar Visita",
          roles: MODULO_ROLES.MODULO_GESTION_TUTOR_ACADEMICO,
        },
      },
      {
        path: "nueva-visita",
        component: AddVisitaComponent,
        data: {
          titulo: "Nueva Visita",
          roles: MODULO_ROLES.MODULO_GESTION_TUTOR_ACADEMICO,
        },
      },
      {
        path: "visitas",
        component: ListVisitasComponent,
        data: {
          titulo: "Visitas",
          roles: MODULO_ROLES.MODULO_GESTION_TUTOR_ACADEMICO,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
