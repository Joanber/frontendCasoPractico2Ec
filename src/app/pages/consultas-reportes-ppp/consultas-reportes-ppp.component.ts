import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatSort, MatTableDataSource, PageEvent, Sort } from '@angular/material';
import autoTable, { UserOptions } from 'jspdf-autotable';
import { Carrera } from 'src/app/models/carrera.model';
import { Convocatoria } from 'src/app/models/convocatoria.model';
import { Empresa } from 'src/app/models/empresa.model';
import { Persona } from 'src/app/models/persona.model';
import { CarreraService } from 'src/app/services/services.models/carrera.service';
import { ConvocatoriasService } from 'src/app/services/services.models/convocatorias.service';
import { EmpresaService } from 'src/app/services/services.models/empresa.service';
import { PersonaService } from 'src/app/services/services.models/persona.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import jsPDF, * as jspdf from 'jspdf';
import { DesignacionTA } from 'src/app/models/designacionta.model';
import { FormControl } from '@angular/forms';
import { LoaderService } from 'src/app/services/interceptores/loader.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DesignacionTaService } from 'src/app/services/services.models/designacion-ta.service';

interface jsPDFWithPlugin extends jspdf.jsPDF {
  [x: string]: any;

  autoTable: (optios: UserOptions) => jspdf.jsPDF;
}


const bd_url = environment.bd_url;
@Component({
  selector: 'app-consultas-reportes-ppp',
  templateUrl: './consultas-reportes-ppp.component.html',
  styleUrls: ['./consultas-reportes-ppp.component.css']
})
export class ConsultasReportesPppComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 
  
}
