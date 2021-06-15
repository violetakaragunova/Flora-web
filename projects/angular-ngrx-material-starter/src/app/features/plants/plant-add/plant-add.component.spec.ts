import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantAddComponent } from './plant-add.component';

describe('PlantAddComponent', () => {
  let component: PlantAddComponent;
  let fixture: ComponentFixture<PlantAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlantAddComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
