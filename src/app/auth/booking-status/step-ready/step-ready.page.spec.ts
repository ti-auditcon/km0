import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepReadyPage } from './step-ready.page';

describe('StepReadyPage', () => {
  let component: StepReadyPage;
  let fixture: ComponentFixture<StepReadyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepReadyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepReadyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
