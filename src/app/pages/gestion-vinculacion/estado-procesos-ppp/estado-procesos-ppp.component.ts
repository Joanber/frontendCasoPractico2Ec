import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { ColorsService } from 'src/app/services/shared/colors.service';

@Component({
  selector: 'app-estado-procesos-ppp',
  templateUrl: './estado-procesos-ppp.component.html',
  styleUrls: ['./estado-procesos-ppp.component.css']
})

export class EstadoProcesosPppComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];

  selected = '';

  @ViewChild(MatPaginator, null) paginator: MatPaginator;
  @ViewChild(MatSort, null) sort: MatSort;

  status: any[] = [];
  currentStatus = {} as any;
  defaultStatus = { style: {}, styleSelect: {}, name: '', color: '' };

  constructor(private color: ColorsService) {
  }

  ngOnInit(): void {
    this.color.status$.subscribe(status => this.status = status);
  }

  ngAfterViewInit() {
  }

  changeStatus(status: any) {
    this.currentStatus = status || this.defaultStatus;
  }
}
