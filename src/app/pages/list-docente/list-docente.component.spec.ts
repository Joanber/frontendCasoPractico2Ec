import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDocenteComponent } from './list-docente.component';

describe('ListDocenteComponent', () => {
  let component: ListDocenteComponent;
  let fixture: ComponentFixture<ListDocenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDocenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
