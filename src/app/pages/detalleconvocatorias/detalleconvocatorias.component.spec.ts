import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleconvocatoriasComponent } from './detalleconvocatorias.component';

describe('DetalleconvocatoriasComponent', () => {
  let component: DetalleconvocatoriasComponent;
  let fixture: ComponentFixture<DetalleconvocatoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleconvocatoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleconvocatoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
