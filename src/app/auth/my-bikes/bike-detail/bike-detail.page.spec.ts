import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeDetailPage } from './bike-detail.page';

describe('BikeDetailPage', () => {
  let component: BikeDetailPage;
  let fixture: ComponentFixture<BikeDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BikeDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
