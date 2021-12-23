import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSolicitudesAlumnosComponent } from './list-solicitudes-alumnos.component';

describe('ListSolicitudesAlumnosComponent', () => {
  let component: ListSolicitudesAlumnosComponent;
  let fixture: ComponentFixture<ListSolicitudesAlumnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSolicitudesAlumnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSolicitudesAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
