import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { Carrera } from 'src/app/models/carrera.model';
import { Empresa } from 'src/app/models/empresa.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { EmpresaService } from 'src/app/services/services.models/empresa.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


const bd_url = environment.bd_url;
@Component({
  selector: 'app-consultas-reportes-ppp',
  templateUrl: './consultas-reportes-ppp.component.html',
  styleUrls: ['./consultas-reportes-ppp.component.css']
})
export class ConsultasReportesPppComponent implements OnInit {

  //VARIABLE DE CARRERAS
  public carreras: Carrera[] = [];
  //VARIABLE DE EMPRESA
  public empresas: Empresa[] = [];

  constructor(

    private carreraService: CarreraService,
    private empresaService: EmpresaService
  ) { }
  ngOnInit() {
    this.getCarreras();
    this.getEmpresas();


  }




  private getEmpresas() {
    this.empresaService.getEmpresas().subscribe((empresas) => {
      this.empresas = empresas;
    });
  }

  private getCarreras() {
    this.carreraService.getCarreras().subscribe((carreras) => {
      this.carreras = carreras;
    });
  }
}

/*convertTablePDF(): void {
  this.getTableFilter();
  let rows = [];
  let cols = [];

  if (this.tabSelected === 0) {
      cols = [
          {title: 'N°', dataKey: 'id'},
          {title: 'TIPO', dataKey: 'tipo'},
          {title: 'ARRENDATARIO', dataKey: 'arren'},
          {title: 'BLOQUE', dataKey: 'bloque'},
          {title: 'SERIE', dataKey: 'serie'},
          {title: '#', dataKey: 'numero'},
          {title: 'EMISIÓN', dataKey: 'emision'},
          {title: 'CADUCA', dataKey: 'caduca'},
          {title: 'VALOR', dataKey: 'valor'}
      ];
      this.tableFilterSolici.forEach((element) => {
          const temp = [
              element.solicitud.idSolicitud,
              element.nombreCatalogo,
              element.solicitud.arrendatario.persona.nombre +
              ' ' +
              element.solicitud.arrendatario.persona.apellido,
              element.numeroBloque,
              element.nombreSerie,
              element.numeroBoveda !== null ? ('Bóveda: ' + element.numeroBoveda) :
                  element.numeroNicho !== null ? ('Nicho:' + element.numeroNicho) : '',
              moment(element.solicitud.fechaSolicitud).format('DD/MM/YYYY'),
              moment(element.solicitud.fechaVencimiento).format('DD/MM/YYYY'),
              element.valorCobrar
          ];
          rows.push(temp);
      });
  } else if (this.tabSelected === 1) {
      cols = [
          'BOVEDA N°',
          'SERIE',
          'ESTADO',
          'DIFUNTO',
          'FECHA DEFUNCIÓN',
          'ARRENDATARIO',
      ];
      this.tableFilterBovedas.forEach((element) => {
          const temp = [
              element.numeroBoveda,
              element.nombreSerie,
              element.estado,
              element.difunto.nombres +' '+ element.difunto.apellidos,
              moment(element.difunto.fechaDefuncion).format('DD/MM/YYYY'),
              element.arrendatario.nombres +
              ' ' +
              element.arrendatario.apellidos,
          ];
          rows.push(temp);
      });
  } else if (this.tabSelected === 2) {
      cols = [
          'NICHO N°',
          'SERIE',
          'ESTADO',
          'DIFUNTO',
          'FECHA DEFUNCIÓN',
          'ARRENDATARIO',
      ];
      this.tableFilterNichos.forEach((element) => {
          const temp = [
              element.numeroNicho,
              element.nombreSerie,
              element.estado,
              element.difunto.nombres +' '+ element.difunto.apellidos,
              moment(element.difunto.fechaDefuncion).format('DD/MM/YYYY'),
              element.arrendatario.nombres +
              ' ' +
              element.arrendatario.apellidos,
          ];
          rows.push(temp);
      });
  } else if (this.tabSelected === 3) {
      cols = [
          'CEDULA',
          'NOMBRES',
          'APELLIDOS',
          'FECHA DEFUNCIÓN',
          'ESTADO',
      ];
      this.tableFilterOsarios.forEach((element) => {
          const temp = [
              element.identificacion,
              element.nombre,
              element.apellido,
              moment(element.fechaDefuncion).format('DD/MM/YYYY'),
              element.estado,
          ];
          rows.push(temp);
      });
  }


  const doc = new jspdf.jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
  doc.setFontSize(16);
  doc.addImage(this.imgBase64, 'png', 30, 20, 45, 40);
  doc.text(this.empresa, 133, 40);
  doc.setFontSize(12);
  doc.text('Ricaurte, ' + this.fechaFormato, 280, 65);
  doc.setFontSize(14);
  doc.text(this.tituloReporte, 155, 90);
  doc.setFontSize(12);
  doc.text('Firma:_______', 40, 520);
  doc.text(this.paginaWeb, 170, 582);
  doc.text(this.derechos, 86, 595);
  doc.autoTable({
      styles: {fontSize: 8},
      columnStyles: {
          id: {columnWidth: 'auto'},
          tipo: {columnWidth: 'auto'},
          arren: {columnWidth: 'auto'},
          bloque: {columnWidth: 'auto'},
          serie: {columnWidth: 'auto'},
          numero: {columnWidth: 40},
          emision: {columnWidth: 'auto'},
          caduca: {columnWidth: 'auto'},
          valor: {columnWidth: 'auto', halign: 'right'}
      },
      columns: cols,
      body: rows,
      startY: doc.autoTableEndPosY() + 100,
  });
  doc.save(this.tituloReporte + '' + this.fechaDocumento +''+new Date().getTime()+ '.pdf');
  cols = [];
  rows = [];
}
*/

