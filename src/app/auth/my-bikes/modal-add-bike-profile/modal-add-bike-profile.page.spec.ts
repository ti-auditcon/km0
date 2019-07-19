import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddBikeProfilePage } from './modal-add-bike-profile.page';

describe('ModalAddBikeProfilePage', () => {
  let component: ModalAddBikeProfilePage;
  let fixture: ComponentFixture<ModalAddBikeProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddBikeProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddBikeProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
