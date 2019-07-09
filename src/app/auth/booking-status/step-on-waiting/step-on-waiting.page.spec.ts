import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepOnWaitingPage } from './step-on-waiting.page';

describe('StepOnWaitingPage', () => {
  let component: StepOnWaitingPage;
  let fixture: ComponentFixture<StepOnWaitingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepOnWaitingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepOnWaitingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
