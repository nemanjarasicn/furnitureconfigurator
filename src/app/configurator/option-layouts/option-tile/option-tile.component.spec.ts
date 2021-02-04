import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionTileComponent } from './option-tile.component';

describe('OptionTileComponent', () => {
  let component: OptionTileComponent;
  let fixture: ComponentFixture<OptionTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
