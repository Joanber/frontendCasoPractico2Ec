import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, PageEvent } from "@angular/material";
import autoTable, { UserOptions } from "jspdf-autotable";
import { Carrera } from "src/app/models/carrera.model";
import { CarreraService } from "src/app/services/services.models/carrera.service";
import { environment } from "src/environments/environment";
import jsPDF, * as jspdf from "jspdf";
import { DesignacionTA } from "src/app/models/designacionta.model";
import { DesignacionTaService } from "src/app/services/services.models/designacion-ta.service";
import { ValidacionSAC } from "src/app/models/validaciones_sac.model";
import { ValidacionesSacService } from "src/app/services/services.models/validaciones-sac.service";
import { DesignacionTE } from "src/app/models/designacionte.model";
import { DesignacionTEService } from "src/app/services/services.models/designacion-te.service";

interface jsPDFWithPlugin extends jspdf.jsPDF {
  [x: string]: any;

  autoTable: (optios: UserOptions) => jspdf.jsPDF;
}

const bd_url = environment.bd_url;
@Component({
  selector: "app-consultas-reportes-ppp",
  templateUrl: "./consultas-reportes-ppp.component.html",
  styleUrls: ["./consultas-reportes-ppp.component.css"],
})
export class ConsultasReportesPppComponent implements OnInit {
  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 5;
  public pageSizeOptions: number[] = [5, 10, 20, 50];
  //MATPAGINATOR
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
  public tutores: string = undefined;
  public carreraFiltro: string = undefined;
  public validacionesSac: ValidacionSAC[] = [];
  public desicnacionesTA: DesignacionTA[] = [];
  public desicnacionesTE: DesignacionTE[] = [];
  public carreras: Carrera[] = [];
  public designacionta = new DesignacionTA();
  public designacionte = new DesignacionTE();

  seleccionado:string;

  listTutores = [
      "Tutores Academico" ,
    "Tutores empresariales" ,
  ];
  constructor(
    private validacionesSacService: ValidacionesSacService,
    private carreraService: CarreraService,
    private designacionTAService: DesignacionTaService,
    private designacionTEService: DesignacionTEService
  ) {}

  ngOnInit() {
    this.getDesignacinTA();
    this.getDesignacinTE();
    this.cargarCarreras();
    this.getValidacionesSacPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.carreraFiltro
    );
  }

  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getValidacionesSacPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.carreraFiltro
    );
  }

  private getValidacionesSacPage(
    page: string,
    size: string,
    carreraFiltro: string
  ) {
    this.validacionesSacService
      .getValidacionesSACPage(page, size, carreraFiltro)
      .subscribe((p) => {
        this.validacionesSac = p.content as ValidacionSAC[];
        this.totalRegistros = p.totalElements as number;
        this.paginador._intl.itemsPerPageLabel = "Registros por página:";
        this.paginador._intl.nextPageLabel = "Siguiente";
        this.paginador._intl.previousPageLabel = "Previa";
        this.paginador._intl.firstPageLabel = "Primera Página";
        this.paginador._intl.lastPageLabel = "Última Página";
      });
  }

  cargarCarreras() {
    this.carreraService
      .getCarreras()
      .subscribe((carreras) => (this.carreras = carreras));
  }
  getDesignacinTA() {
    this.designacionTAService
      .getDesiganacionesTA()
      .subscribe((dta) => (this.desicnacionesTA = dta));
  }
  getDesignacinTE() {
    this.designacionTEService
      .getDesiganacionesTE()
      .subscribe((dte) => (this.desicnacionesTE = dte));
  }
  public filtrarValidacionesSACCarrera() {
    if (this.carreraFiltro != null) {
      this.getValidacionesSacPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        this.carreraFiltro
      );
    } else {
      return;
    }
  }

  cargarConvocatoriasDefault() {
    this.carreraFiltro = undefined;
    return this.getValidacionesSacPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.carreraFiltro
    );
  }
}
