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
      submenu: [{ titulo: "Main", url: "/" }],
    },
    {
      titulo: "Ventas",
      icono: "mdi mdi-cart",
      submenu: [
        { titulo: "Ventas", url: "ventas", icono: "mdi mdi-cart-plus" },
      ],
    },

    {
      titulo: "Productos",
      icono: "mdi mdi-shopping",
      submenu: [
        {
          titulo: "Productos",
          url: "usuarios",
          icono: " mdi mdi-pizza",
        },
        {
          titulo: "Categorias",
          url: "hospitales",
          icono: "mdi mdi-food-fork-drink",
        },
      ],
    },
    {
      titulo: "Inventario",
      icono: "mdi mdi-cash-usd",
      submenu: [
        {
          titulo: "Agregar Inventario",
          url: "usuarios",
          icono: "mdi mdi-folder-plus",
        },
        {
          titulo: "Productos bajos en stock",
          url: "hospitales",
          icono: "mdi mdi-arrow-down-box",
        },
      ],
    },
    {
      titulo: "Reportes",
      icono: "mdi mdi-file-chart",
      submenu: [
        {
          titulo: "Reporte de ventas",
          url: "usuarios",
          icono: "mdi mdi-chart-bar",
        },
        {
          titulo: "Reporte de inventario",
          url: "hospitales",
          icono: "mdi mdi-lan",
        },
      ],
    },
    {
      titulo: "Facturas",
      icono: "mdi mdi-square-inc-cash",
      submenu: [
        { titulo: "Facturas", url: "usuarios", icono: "mdi mdi-cash-multiple" },
      ],
    },
  ];
}
