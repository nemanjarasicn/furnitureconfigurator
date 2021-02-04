import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationPreviewComponent } from './configuration-preview.component';

describe('ConfigurationPreviewComponent', () => {
  let component: ConfigurationPreviewComponent;
  let fixture: ComponentFixture<ConfigurationPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
