import { Injectable } from '@angular/core';
import { MODULO_ROLES } from '../services.models/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor() {}
  public roleAdmin: any = ['ROLE_ADMIN', 'ROLE_USER'];
  public roleAdminVinculacion: any = ['ROLE'];
  public rolesAll: any = [
    'ROLE_ADMIN',
    'ROLE_TACADEMICO',
    'ROLE_VINCULACION',
    'ROLE_CARRERA',
    'ROLE_EMPRESA',
    'ROLE_PPP',
    'ROLE_ALUMNO',
  ];
  public rolesNotAll: any = ['ROLE_ADMIN'];
  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-view-dashboard',
      submenu: [
        { titulo: 'Convocatorias', url: 'infoconvocatoria' },
        { titulo: 'Procesos', url: 'infoprocesos' },
        { titulo: 'Informacion Carrera', url: 'infocarrera' },
        { titulo: 'Instructivo/Anexos', url: 'soli/instructivos' },
      ],
    },
    {
      titulo: 'Gestión de Vinculación ',
      icono: 'mdi mdi-account-switch',
      submenu: [
        {
          titulo: 'Convenios',
          icono: 'mdi mdi-book-multiple-variant',
          url: 'convenios',
        },
        {
          titulo: 'Acreditacion PPP',
          icono: 'mdi   mdi-file-document',
          url: 'acreditacion-ppp',
        },
        {
          titulo: 'Procesos PPP',
          icono: 'mdi  mdi mdi-chart-line',
          url: 'estado-procesos-ppp',
        },
        {
          titulo: 'Historial PPP',
          icono: 'mdi    mdi-archive',
          url: 'historial-procesos-ppp',
        },
      ], roles: MODULO_ROLES.MODULO_VINCULACION
    },
    {
      titulo: 'Gestión de Carrera ',
      icono: 'mdi mdi-clipboard-text',
      submenu: [
        {
          titulo: 'Empresas',
          url: 'empresas',
        },
        { titulo: 'Docentes', url: 'docentes' },
        { titulo: 'ResponsablesPPP', url: 'responsablesppp' },
        { titulo: 'Carreras', url: 'carreras' },
      ],
      roles: MODULO_ROLES.MODULO_GESTION_CARRERAS
    },
    {
      titulo: 'Gestion Empresa',
      icono: 'mdi mdi-account-network',
      submenu: [
        {
          titulo: 'Solicitud  de Empresa',
          url: 'list-solicitud-empresa',
        },
        {
          titulo: 'Listado de estudiantes asignados',
          url: 'lista-estudiantes-asignados',
        },
        {
          titulo: 'Designar Tutor Empresarial',
          url: 'convocatorias-aprobadas',
        },
        {
          titulo: 'Evaluación a estudiante',
          url: 'evaluacion-estudiante-empresa',
        },
        {
          titulo: 'Certificado',
          url: 'certificado-estudiante-empresa',
        },
      ], roles: MODULO_ROLES.MODULO_GESTION_EMPRESA
    },
    {
      titulo: 'Gestion de PPP',
      icono: 'mdi mdi-server-security',
      submenu: [
        {
          titulo: 'Solicitudes Empresas',
          url: 'solicitudes_empresas',
        },
        {
          titulo: 'Convocatorias',
          url: 'convocatorias',
        },
        {
          titulo: 'Respuestas Empresas',
          url: 'respuestas-empresas',
        },
        {
          titulo: 'Actas',
          url: 'list-actas',
        },
        {
          titulo: 'Consultas Reportes',
          url: 'consultas-reportes',
        },
      ], roles: MODULO_ROLES.MODULO_GESTION_PPP
    },
    {
      titulo: 'Gestion Tutor Academico',
      icono: 'mdi mdi-school',
      submenu: [
        {
          titulo: 'Seguimientos',
          url: 'seguimientos',
        },
        {
          titulo: 'Visitas',
          url: 'visitas',
        },
        {
          titulo: 'Evaluaciones',
          url: 'evualaciones',
        },
      ],
      roles: MODULO_ROLES.MODULO_GESTION_TUTOR_ACADEMICO
    },
    {
      titulo: 'Gestion Alumnos',
      icono: 'mdi mdi-layers',
      submenu: [
        {
          titulo: 'Convocatorias Abiertas',
          url: 'convocatoriasabiertas',
        },
        {
          titulo: 'Solicitudes Alumnos',
          url: 'solicitudes_estudiantes',
        },
        {
          titulo: 'Asistencias',
          url: 'asistencias',
        },
        {
          titulo: 'Informes',
          url: 'informe',
        },
      ],
      roles: MODULO_ROLES.MODULO_GESTION_ALUMNOS
    },
    {
      titulo: 'Personal',
      icono: 'mdi  mdi-odnoklassniki',
      submenu: [
        {
          titulo: 'Personas',
          url: 'personas',
        },
        {
          titulo: 'Usuarios',
          url: 'usuarios',
        },
      ],
      roles: MODULO_ROLES.MODULO_GESTION_PERSONAL
    },
  ];
}
