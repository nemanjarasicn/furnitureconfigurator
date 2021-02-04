import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionInputComponent } from './option-input.component';

describe('OptionInputComponent', () => {
  let component: OptionInputComponent;
  let fixture: ComponentFixture<OptionInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
