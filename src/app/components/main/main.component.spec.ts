import { ComponentFixture, TestBed } from '@angular/core/testing';

import { main } from './main.component';

describe('main', () => {
  let component: main;
  let fixture: ComponentFixture<main>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [main]
    });
    fixture = TestBed.createComponent(main);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
