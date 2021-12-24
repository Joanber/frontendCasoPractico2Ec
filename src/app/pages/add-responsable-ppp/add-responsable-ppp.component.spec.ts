import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResponsablePPPComponent } from './add-responsable-ppp.component';

describe('AddResponsablePPPComponent', () => {
  let component: AddResponsablePPPComponent;
  let fixture: ComponentFixture<AddResponsablePPPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddResponsablePPPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddResponsablePPPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
