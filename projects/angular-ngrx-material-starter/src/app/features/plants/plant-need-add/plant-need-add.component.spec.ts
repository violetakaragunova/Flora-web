import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantNeedAddComponent } from './plant-need-add.component';

describe('PlantNeedAddComponent', () => {
  let component: PlantNeedAddComponent;
  let fixture: ComponentFixture<PlantNeedAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantNeedAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantNeedAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
