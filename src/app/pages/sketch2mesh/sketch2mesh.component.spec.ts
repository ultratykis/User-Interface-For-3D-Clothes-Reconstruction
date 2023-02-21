import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sketch2meshComponent } from './sketch2mesh.component';

describe('Sketch2meshComponent', () => {
  let component: Sketch2meshComponent;
  let fixture: ComponentFixture<Sketch2meshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sketch2meshComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sketch2meshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
