import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SketchPadComponent } from './sketch-pad.component';

describe('SketchPadComponent', () => {
  let component: SketchPadComponent;
  let fixture: ComponentFixture<SketchPadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SketchPadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SketchPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
