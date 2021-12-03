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
      submenu: [{ titulo: "Convocatorias", url: "/" }],
    },
    {
      titulo: "Solicitudes",
      icono: "mdi mdi-clipboard-text",
      submenu: [
        { titulo: "Solicitud Empresa", url: "solictudempresa" },
        { titulo: "Solicitud Alumno", url: "solicitudalumno" },
      ],
    },

    {
      titulo: "Academico",
      icono: "mdi mdi-account-settings",
      submenu: [
        {
          titulo: "Docentes",
          url: "docentes",
          icono: " mdi mdi-pizza",
        },
        {
          titulo: "Alumnos",
          url: "alumnos",
          icono: "mdi mdi-food-fork-drink",
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
    {
      titulo: "Empresas",
      icono: "mdi mdi-account-multiple",
      submenu: [
        {
          titulo: "Empresas",
          url: "empresas",
        },
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
  ];
}
