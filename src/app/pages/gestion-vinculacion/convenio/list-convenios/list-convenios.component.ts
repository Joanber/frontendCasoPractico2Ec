import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  searchInput = new FormControl('');
  displayedColumns: string[] = ['id', 'nombre', 'empresa', 'carrera', 'acciones'];
  value: any;
  public pageSizeOptions: number[] = [10, 20, 50, 100];
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
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource([]);
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
    // this.loading = true;
    this.convenioService.retrieveConveniosByPage(page.toString(), size.toString(), sortBy).subscribe({
      next: (convenios) => {
        if (convenios.content.length === 0) {
          this.dataSource = new MatTableDataSource();
          this.emptyList = true;
        }

        this.convenios = convenios.content;
        this.totalElements = convenios.totalElements;
      }, complete: () => {
        if (this.convenios.length > 0) {
          this.initPaginator();
        }
        console.warn(this.dataSource.data.length < 1 );
      }, error: (err) => console.log(err)
    });
  }

  initPaginator() {
    this.dataSource = new MatTableDataSource(this.convenios);
    this.dataSource.filterPredicate = (data: Convenio, filter: string) => data.carrera.nombre.indexOf(filter) !== -1;
    this.dataSource.sortingDataAccessor = (convenio, property) => {
      switch (property) {
        case 'empresa': return convenio.empresa.nombre;
        case 'carrera': return convenio.carrera.nombre;
        default: return convenio[property];
      }
    };


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
    // this.search = false;
    // this.searchInput.reset();
    return this.retriveConveniosByPage(
      this.currentPage,
      this.pageSize,
      this.sortBy
    );
  }

  SortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${ sortState.direction }ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}