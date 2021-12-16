import { Component, OnInit } from '@angular/core';
import { Convenio } from './../../../../models/convenio';
import { ConvenioService } from './../../../../services/services.models/convenio.service';

@Component({
  selector: 'app-list-convenios',
  templateUrl: './list-convenios.component.html',
  styleUrls: ['./list-convenios.component.css']
})
export class ListConveniosComponent implements OnInit {

  convenios = {} as Convenio[];
  constructor(private convenioService: ConvenioService) {}

  ngOnInit() {
    this.retrieveConvenios();
  }
  retrieveConvenios() {
    this.convenioService.retrieveConvenios().subscribe({ next: (convenios) => this.convenios = convenios });
  }

}
