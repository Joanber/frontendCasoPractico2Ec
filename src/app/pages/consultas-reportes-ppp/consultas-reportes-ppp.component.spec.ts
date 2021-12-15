import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultasReportesPppComponent } from './consultas-reportes-ppp.component';

describe('ConsultasReportesPppComponent', () => {
  let component: ConsultasReportesPppComponent;
  let fixture: ComponentFixture<ConsultasReportesPppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultasReportesPppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultasReportesPppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
