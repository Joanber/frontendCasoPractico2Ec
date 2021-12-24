import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator, PageEvent } from "@angular/material";
import { Carrera } from "src/app/models/carrera.model";
import { Convocatoria } from "src/app/models/convocatoria.model";
import { CarreraService } from "src/app/services/services.models/carrera.service";
import { ConvocatoriasService } from "src/app/services/services.models/convocatorias.service";

@Component({
  selector: "app-list-infoconvocatoria",
  templateUrl: "./list-infoconvocatoria.component.html",
  styleUrls: ["./list-infoconvocatoria.component.css"],
  providers: [DatePipe],
})
export class ListInfoConvocatoriaComponent implements OnInit {
  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 10;
  public pageSizeOptions: number[] = [10, 20, 50, 100];
  // MATPAGINATOR
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;

  public convocatorias: Convocatoria[] = [];
  public carreras: Carrera[] = [];
  // VARIABLES PARA BUSCAR
  public carreraFiltro: string = undefined;
  public fecha = '';
  public fechaControl = new FormControl();

  constructor(
    private convocatoriaService: ConvocatoriasService,
    private carreraService: CarreraService,
    private miDatePipe: DatePipe
  ) {}

  ngOnInit() {
    this.cargarCarreras();
    this.getConvocatoriasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.carreraFiltro,
      ''
    );
  }
  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getConvocatoriasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.carreraFiltro,
      'date'
    );
  }
  public filtarConvocatoriasPorFechaCarrera() {

    if (this.fechaControl.value != null && this.carreraFiltro != null) {
      const fechaFormateada = this.miDatePipe.transform(
        this.fechaControl.value,
        'yyyy-MM-dd'
      );

      console.log(fechaFormateada);

      this.getConvocatoriasPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        this.carreraFiltro,
        fechaFormateada
      );
    } else {
      return;
    }
  }

  cargarConvocatoriasDefault() {
    this.carreraFiltro = undefined;
    return this.getConvocatoriasPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.carreraFiltro,
      ''
    );
  }

  private getConvocatoriasPage(
    page: string,
    size: string,
    carreraFiltro: string,
    fecha: string
  ) {
    this.convocatoriaService
      .getConvocatoriasPage(page, size, carreraFiltro, fecha)
      .subscribe((p) => {
        this.convocatorias = p.content as Convocatoria[];
        this.totalRegistros = p.totalElements as number;
        this.paginador._intl.itemsPerPageLabel = 'Registros por página:';
        this.paginador._intl.nextPageLabel = 'Siguiente';
        this.paginador._intl.previousPageLabel = 'Previa';
        this.paginador._intl.firstPageLabel = 'Primera Página';
        this.paginador._intl.lastPageLabel = 'Última Página';
      });
  }
  cargarCarreras() {
    this.carreraService
      .getCarreras()
      .subscribe((carreras) => (this.carreras = carreras));
  }
}
