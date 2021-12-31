import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSolicitudEstudianteComponent } from './add-solicitud-estudiante.component';

describe('AddSolicitudEstudianteComponent', () => {
  let component: AddSolicitudEstudianteComponent;
  let fixture: ComponentFixture<AddSolicitudEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSolicitudEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSolicitudEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
