import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPublicImagePage } from './modal-public-image.page';

describe('ModalPublicImagePage', () => {
  let component: ModalPublicImagePage;
  let fixture: ComponentFixture<ModalPublicImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPublicImagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPublicImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
