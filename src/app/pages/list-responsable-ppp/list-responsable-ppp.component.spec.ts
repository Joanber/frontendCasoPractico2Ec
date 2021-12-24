import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResponsablePPPComponent } from './list-responsable-ppp.component';

describe('ListResponsablePPPComponent', () => {
  let component: ListResponsablePPPComponent;
  let fixture: ComponentFixture<ListResponsablePPPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListResponsablePPPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListResponsablePPPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
