import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddSpecializedPage } from './modal-add-specialized.page';

describe('ModalAddSpecializedPage', () => {
  let component: ModalAddSpecializedPage;
  let fixture: ComponentFixture<ModalAddSpecializedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAddSpecializedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddSpecializedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
