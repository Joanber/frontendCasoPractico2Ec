import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SidebarService {
  constructor() {}
  menu: any[] = [
    {
      titulo: "Dashboard",
      icono: "mdi mdi-gauge",
      submenu: [
        { titulo: "Convocatorias", url: "infoconvocatoria" },
        { titulo: "Procesos", url: "soli/procesos" },
        { titulo: "Informacion Carrera", url: "infocarrera" },
        { titulo: "Instructivo/Anexos", url: "soli/instructivos" },
      ],
    },
    {
      titulo: "Gestión de Vinculación ",
      icono: "mdi mdi-account-switch",
      submenu: [
        {
          titulo: "Convenios",
          icono: "mdi  mdi-file-outline",
          url: "convenios",
        },
        {
          titulo: "Acreditacion PPP",
          icono: "mdi   mdi-file-document",
          url: "acreditacion-ppp",
        },
        {
          titulo: "Procesos PPP",
          icono: "mdi  mdi mdi-chart-line",
          url: "estado-procesos-ppp",
        },
        {
          titulo: "Historial PPP",
          icono: "mdi    mdi-archive",
          url: "historial-procesos-ppp",
        },
      ],
    },
    {
      titulo: "Gestión de Carrera ",
      icono: "mdi mdi-clipboard-text",
      submenu: [
        { titulo: "Empresas", url: "empresas" },
        { titulo: "Docentes", url: "docentes" },
        { titulo: "Carreras", url: "carreras" },
      ],
    },
    {
      titulo: "Gestion Empresa",
      icono: "mdi mdi-account-multiple",
      submenu: [
        {
          titulo: "Solicitar Requerimiento(A1)",
          url: "solicitar/a1",
        },
        {
          titulo: "Consultar Listado de estudiantes asignados(A4)",
          url: "solicitar/a4",
        },
        {
          titulo: "Designar tutor empresarial(A5)",
          url: "solicitar/a5",
        },
        {
          titulo: "Evaluación a estudiante(A12)",
          url: "solicitar/a12",
        },
        {
          titulo: "Certificado(12.1)",
          url: "solicitar/a12_1",
        },
      ],
    },
    {
      titulo: "Gestion de PPP",
      icono: "mdi mdi-account-multiple",
      submenu: [
        {
          titulo: "Solicitudes Empresas",
          url: "solicitudes_empresas",
        },
        {
          titulo: "Convocatorias",
          url: "convocatorias",
        },
        {
          titulo: "Seleccion de estudiantes",
          url: "nueva-seleccion-estudiantes",
        },
        {
          titulo: "Designar Tutor academico",
          url: "actualizar-seleccion-estudiantes",
        },

        {
          titulo: "Designar Tutor academico",
          url: "designarTutorAcademico",
        },

        {
          titulo: "Generar Acta",
          url: "generarActa",
        },

        {
          titulo: "Consultas Reportes",
          url: "consultas-reportes",
        },
      ],
    },
    {
      titulo: "Gestion Tutor Academico",
      icono: "mdi mdi-account-multiple",
      submenu: [
        {
          titulo: "Seguimientos",
          url: "seguimientos",
        },
        {
          titulo: "Visitas",
          url: "visitas",
        },
        {
          titulo: "Evaluaciones",
          url: "evualaciones",
        },
      ],
    },
    {
      titulo: "Gestion Alumnos",
      icono: "mdi mdi-account-multiple",
      submenu: [
        {
          titulo: "Convocatorias",
          url: "convocatoriasabiertas",
        },
        {
          titulo: "Solicitudes",
          url: "solicitud",
        },
        {
          titulo: "Asistencias",
          url: "asistencias",
        },
        {
          titulo: "Informes",
          url: "informe",
        },
      ],
    },
    {
      titulo: "Personal",
      icono: "mdi mdi-account-multiple",
      submenu: [
        {
          titulo: "Personas",
          url: "personas",
        },
        {
          titulo: "Usuarios",
          url: "usarios",
        },
      ],
    },
  ];
}
