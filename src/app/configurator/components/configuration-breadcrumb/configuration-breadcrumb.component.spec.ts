import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationBreadcrumbComponent } from './configuration-breadcrumb.component';

describe('ConfigurationBreadcrumbComponent', () => {
  let component: ConfigurationBreadcrumbComponent;
  let fixture: ComponentFixture<ConfigurationBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurationBreadcrumbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
