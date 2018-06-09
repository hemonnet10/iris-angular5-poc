import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreserveFoodComponent } from './preserve-food.component';

describe('PreserveFoodComponent', () => {
  let component: PreserveFoodComponent;
  let fixture: ComponentFixture<PreserveFoodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreserveFoodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreserveFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
