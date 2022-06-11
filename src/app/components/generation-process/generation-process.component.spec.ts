import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerationProcessComponent } from './generation-process.component';

describe('GenerationProcessComponent', () => {
  let component: GenerationProcessComponent;
  let fixture: ComponentFixture<GenerationProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerationProcessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
