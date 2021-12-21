import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import Swal from 'sweetalert2';
import { Convenio } from './../../../../models/convenio';
import { ConvenioService } from './../../../../services/services.models/convenio.service';

@Component({
  selector: 'app-list-convenios',
  templateUrl: './list-convenios.component.html',
  styleUrls: ['./list-convenios.component.css']
})
export class ListConveniosComponent implements OnInit, AfterViewInit {
  constructor(private convenioService: ConvenioService) {
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['id', 'nombre', 'empresa', 'carrera', 'acciones'];

  public pageSizeOptions: number[] = [10, 20, 50, 100];

  dataSource: MatTableDataSource<Convenio>;
  convenios: Convenio[] = [];
  totalElements = 0;
  currentPage = 0;
  pageSize = 10;
  loading = true;
  sortBy = '';
  message = '';
  search = false;
  emptyList: boolean;

  ngAfterViewInit() {
    this.paginator.pageIndex = this.currentPage;
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.retriveConveniosByPage(this.currentPage, this.pageSize, this.sortBy);
  }

  deleteById(convenio: Convenio) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '¿Está  seguro?',
        text: `¿Seguro que desea eliminar el convenio ${ convenio.nombre }?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.convenioService.deleteConvenio(convenio.id).subscribe({
            complete: () => {
              this.retriveConveniosByPage(
                this.currentPage,
                this.pageSize,
                this.sortBy
              );
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                `Convenio ${ convenio.nombre } eliminado correctamente!`,
                'success'
              );
            }
          });
        }
      });
  }

  retriveConveniosByPage(page: number, size: number, sortBy: string) {
    this.loading = true;
    this.convenioService.retrieveConveniosByPage(page.toString(), size.toString(), sortBy).subscribe({
      next: (convenios) => {
        this.convenios = convenios.content;
        this.emptyList = convenios.content.length === 0;
        this.totalElements = convenios.totalElements;
      }, complete: () => {
        this.initPaginator();
        this.loading = false;
      }, error: (err) => console.log(err)
    });

  }

  initPaginator() {
    this.paginator._intl.itemsPerPageLabel = 'Registros por página:';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Previa';
    this.paginator._intl.firstPageLabel = 'Primera Página';
    this.paginator._intl.lastPageLabel = 'Última Página';
    this.dataSource = new MatTableDataSource(this.convenios);
    this.dataSource.filterPredicate = (data: Convenio, filter: string) => data.carrera.nombre.indexOf(filter) !== -1;
    this.dataSource.sort = this.sort;
    this.paginator.length = this.totalElements;
  }

  paginate(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.retriveConveniosByPage(
      this.currentPage,
      this.pageSize,
      this.sortBy
    );
  }

  searchByCarrera(sortBy: string) {
    if (sortBy.length > 0) {
      this.search = true;
      this.retriveConveniosByPage(
        this.currentPage,
        this.pageSize,
        sortBy
      );
      if (!this.emptyList) {
        this.message = `No se encontraron registros con la carrera" ${ sortBy } " `;
      }
    }
  }


  filterByCarrera(sortBy: string) {
    this.dataSource.filter = sortBy.trim().toUpperCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (sortBy === '') {
      this.dataSource.filter = '';
    }
    this.message = `Sin coincidencias para " ${ sortBy } " `;
  }

  resetSearch() {
      this.search = false;
      return this.retriveConveniosByPage(
        this.currentPage,
        this.pageSize,
        this.sortBy
      );
  }
}
