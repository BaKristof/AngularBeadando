import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimediagramComponent } from './timediagram.component';

describe('TimediagramComponent', () => {
  let component: TimediagramComponent;
  let fixture: ComponentFixture<TimediagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimediagramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimediagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
