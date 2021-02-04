import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationItemOptionsComponent } from './configuration-item-options.component';

describe('ConfigurationItemOptionsComponent', () => {
  let component: ConfigurationItemOptionsComponent;
  let fixture: ComponentFixture<ConfigurationItemOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationItemOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationItemOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
