import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantNeedComponent } from './plant-need.component';

describe('PlantNeedComponent', () => {
  let component: PlantNeedComponent;
  let fixture: ComponentFixture<PlantNeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantNeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantNeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
