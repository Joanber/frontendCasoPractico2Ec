import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvocatoriaComponent } from './convocatoria.component';

describe('ConvocatoriaComponent', () => {
  let component: ConvocatoriaComponent;
  let fixture: ComponentFixture<ConvocatoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvocatoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvocatoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
