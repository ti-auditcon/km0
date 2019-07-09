import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialMessagePage } from './special-message.page';

describe('SpecialMessagePage', () => {
  let component: SpecialMessagePage;
  let fixture: ComponentFixture<SpecialMessagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialMessagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
