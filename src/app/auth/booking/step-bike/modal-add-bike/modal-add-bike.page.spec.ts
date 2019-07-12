import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddBikePage } from './modal-add-bike.page';

describe('ModalAddBikePage', () => {
  let component: ModalAddBikePage;
  let fixture: ComponentFixture<ModalAddBikePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddBikePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddBikePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
