import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenararActaComponent } from './genarar-acta.component';

describe('GenararActaComponent', () => {
  let component: GenararActaComponent;
  let fixture: ComponentFixture<GenararActaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenararActaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenararActaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
