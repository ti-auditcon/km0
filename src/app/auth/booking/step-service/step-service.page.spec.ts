import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepServicePage } from './step-service.page';

describe('StepServicePage', () => {
  let component: StepServicePage;
  let fixture: ComponentFixture<StepServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepServicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
