import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmpresaComponent } from './list-empresa.component';

describe('ListEmpresaComponent', () => {
  let component: ListEmpresaComponent;
  let fixture: ComponentFixture<ListEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
