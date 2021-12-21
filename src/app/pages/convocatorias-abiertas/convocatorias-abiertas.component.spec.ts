import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocatoriasAbiertasComponent } from './convocatorias-abiertas.component';

describe('ConvocatoriasAbiertasComponent', () => {
  let component: ConvocatoriasAbiertasComponent;
  let fixture: ComponentFixture<ConvocatoriasAbiertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvocatoriasAbiertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvocatoriasAbiertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
