import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepSummaryPage } from './step-summary.page';

describe('StepSummaryPage', () => {
  let component: StepSummaryPage;
  let fixture: ComponentFixture<StepSummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepSummaryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
