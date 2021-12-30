import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatSort, MatTableDataSource, PageEvent, Sort } from '@angular/material';
import { LoaderService } from 'src/app/services/interceptores/loader.service';
import Swal from 'sweetalert2';
import { Convenio } from './../../../../models/convenio';
import { ConvenioService } from './../../../../services/services.models/convenio.service';
@Component({
  selector: 'app-list-convenios',
  templateUrl: './list-convenios.component.html',
  styleUrls: ['./list-convenios.component.css']
})
export class ListConveniosComponent implements OnInit, AfterViewInit {
  constructor(private convenioService: ConvenioService, private _liveAnnouncer: LiveAnnouncer, public loaderService: LoaderService) {
  }

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private sorts: MatSort;

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sorts = ms;
    this.dataSource.sort = this.sorts;
  }

  displayedColumns: string[] = ['id', 'nombre', 'empresa', 'carrera', 'acciones'];

  textSearch: string;
  textFilter: string;

  pageSizeOptions: number[] = [10, 20, 50, 100];
  dataSource = new MatTableDataSource<Convenio>();

  convenios: Convenio[] = [];

  totalElements = 0;
  currentPage = 0;
  pageSize = 10;
  sortBy = '';
  message = '';
  search = false;
  emptyList = false;

  ngAfterViewInit() {
    this.paginator.pageIndex = this.currentPage;
  }

  ngOnInit() {
    this.retriveConveniosByPage(this.currentPage, this.pageSize, this.sortBy);
  }

  deleteById(convenio: Convenio) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
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
        if (result.isConfirmed) {
          this.convenioService.deleteConvenio(convenio.id).subscribe({
            complete: () => {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1200,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                }
              });
              Toast.fire({
                icon: 'success',
                title: `${ convenio.nombre } eliminado!`,
              });
              this.sortBy = this.textSearch || this.sortBy;
              this.retriveConveniosByPage(
                this.currentPage,
                this.pageSize,
                this.sortBy
              );
            }
          });
        }
      });
  }

  retriveConveniosByPage(page: number, size: number, sortBy: string): any {
    this.convenioService.retrieveConveniosByPage(page.toString(), size.toString(), sortBy.trim()).subscribe({
      next: (convenios) => {
        this.emptyList = convenios.content.length === 0;
        if (convenios.content.length === 0) {
          this.emptyList = !this.search;
          if (this.search && this.textSearch) {
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 2000,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
              }
            });
            Toast.fire({
              icon: 'info',
              title: `No se encontraron registros con la carrera " ${ sortBy } "`,
              showClass: {
                popup: 'animate__animated animate__bounceInRight'
              },
              hideClass: {
                popup: 'animate__animated animate__backOutRight'
              }
            });
            this.search = false;
          }
        } else {
          this.convenios = convenios.content;
          this.totalElements = convenios.totalElements;
        }
      }, complete: () => {
        if (this.emptyList === false) {
          this.initPaginator();
          this.textFilter = '';
        }
      }, error: (err) => console.log(err)
    });
  }

  initPaginator() {
    this.dataSource.data = this.convenios;
    this.dataSource.filterPredicate = (data: Convenio, filter: string) => data.carrera.nombre.indexOf(filter) !== -1;
    this.dataSource.sortingDataAccessor = (convenio, property) => {
      switch (property) {
        case 'empresa': return convenio.empresa.nombre;
        case 'carrera': return convenio.carrera.nombre;
        default: return convenio[property];
      }
    };

    this.paginator._intl.itemsPerPageLabel = 'Registros por página:';
    this.paginator._intl.nextPageLabel = 'Siguiente';
    this.paginator._intl.previousPageLabel = 'Previa';
    this.paginator._intl.firstPageLabel = 'Primera Página';
    this.paginator._intl.lastPageLabel = 'Última Página';
    this.paginator.length = this.totalElements;
  }
  CustomPaginator(): MatPaginatorIntl {
    const customPaginatorIntl = new MatPaginatorIntl();
    customPaginatorIntl.itemsPerPageLabel = 'Registros por página:';
    customPaginatorIntl.nextPageLabel = 'Siguiente';
    customPaginatorIntl.previousPageLabel = 'Previa';
    customPaginatorIntl.firstPageLabel = 'Primera Página';
    customPaginatorIntl.lastPageLabel = 'Última Página';
    return customPaginatorIntl;
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
        sortBy);
    }
    // if (!this.emptyList && this.search) {
    //   this.message = `No se encontraron registros con la carrera" ${ sortBy } " `;
    // }
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
    if (!this.emptyList && this.search) {
      this.retriveConveniosByPage(
        this.currentPage,
        this.pageSize,
        ''
      );
    }
    this.search = false;
  }

  SortChange(sortState: Sort) {
    console.warn(sortState);

    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${ sortState.direction }ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
