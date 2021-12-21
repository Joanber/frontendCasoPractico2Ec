import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformeComponent } from './informe.component';

describe('InformeComponent', () => {
  let component: InformeComponent;
  let fixture: ComponentFixture<InformeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
