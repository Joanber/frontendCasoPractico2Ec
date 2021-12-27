import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpresaPersonalComponent } from './add-empresa-personal.component';

describe('AddEmpresaPersonalComponent', () => {
  let component: AddEmpresaPersonalComponent;
  let fixture: ComponentFixture<AddEmpresaPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmpresaPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpresaPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
