import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepBikePage } from './step-bike.page';

describe('StepBikePage', () => {
  let component: StepBikePage;
  let fixture: ComponentFixture<StepBikePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepBikePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepBikePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
