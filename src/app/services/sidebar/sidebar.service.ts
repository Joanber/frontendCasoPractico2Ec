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
      submenu: [{ titulo: "Convocatorias", url: "soli/convoc1" },
               { titulo: "Procesos", url: "soli/procesos" },
               { titulo: "Informacion Carrera", url: "soli/infocarrera" },
               { titulo: "Instructivo/Anexos", url: "soli/instructivos" }],

    },
    {
      titulo: "Gestión de Vinculación ",
      icono: "mdi mdi-clipboard-text",
      submenu: [
        { titulo: "Convenios", url: "convenios" },
        { titulo: "Informes", url: "informes" },
        { titulo: "Consultar Procesos", url: "consultarProcesos" },
        { titulo: "Historial", url: "historial" },
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
          titulo: "Convocatorias",
          url: "convocatorias",
        },
        {
          titulo: "Seleccion de estudiantes",
          url: "seleccionestudiantes",
        },
        {
          titulo: "Designar Tutor academico",
          url: "designarTutorAcademico",
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
          url: "convocatorias",
        },
        {
          titulo: "Solicitudes",
          url: "solicitudes",
        },
        {
          titulo: "Asistencias",
          url: "asistencias",
        },
        {
          titulo: "Informes",
          url: "informes",
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
