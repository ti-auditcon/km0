import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDatesPage } from './step-dates.page';

describe('StepDatesPage', () => {
  let component: StepDatesPage;
  let fixture: ComponentFixture<StepDatesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepDatesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepDatesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
