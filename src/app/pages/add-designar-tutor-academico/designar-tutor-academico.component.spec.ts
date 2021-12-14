import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignarTutorAcademicoComponent } from './designar-tutor-academico.component';

describe('DesignarTutorAcademicoComponent', () => {
  let component: DesignarTutorAcademicoComponent;
  let fixture: ComponentFixture<DesignarTutorAcademicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignarTutorAcademicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignarTutorAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
