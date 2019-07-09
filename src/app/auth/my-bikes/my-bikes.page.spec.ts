import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBikesPage } from './my-bikes.page';

describe('MyBikesPage', () => {
  let component: MyBikesPage;
  let fixture: ComponentFixture<MyBikesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBikesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBikesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
