import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratComponent } from './generat.component';

describe('GeneratComponent', () => {
  let component: GeneratComponent;
  let fixture: ComponentFixture<GeneratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
