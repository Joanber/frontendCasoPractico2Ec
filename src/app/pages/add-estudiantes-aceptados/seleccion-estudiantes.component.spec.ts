import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionEstudiantesComponent } from './seleccion-estudiantes.component';

describe('SeleccionEstudiantesComponent', () => {
  let component: SeleccionEstudiantesComponent;
  let fixture: ComponentFixture<SeleccionEstudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionEstudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
