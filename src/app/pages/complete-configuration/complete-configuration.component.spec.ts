import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteConfigurationComponent } from './complete-configuration.component';

describe('CompleteConfigurationComponent', () => {
  let component: CompleteConfigurationComponent;
  let fixture: ComponentFixture<CompleteConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
