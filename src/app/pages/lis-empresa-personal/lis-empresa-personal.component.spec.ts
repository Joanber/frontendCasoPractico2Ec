import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LisEmpresaPersonalComponent } from './lis-empresa-personal.component';

describe('LisEmpresaPersonalComponent', () => {
  let component: LisEmpresaPersonalComponent;
  let fixture: ComponentFixture<LisEmpresaPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LisEmpresaPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LisEmpresaPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
