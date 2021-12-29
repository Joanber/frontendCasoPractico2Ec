import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarAlumnosComponent } from './seleccionar-alumnos.component';

describe('SeleccionarAlumnosComponent', () => {
  let component: SeleccionarAlumnosComponent;
  let fixture: ComponentFixture<SeleccionarAlumnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionarAlumnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
