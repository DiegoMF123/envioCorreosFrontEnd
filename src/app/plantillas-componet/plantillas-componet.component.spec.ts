import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillasComponetComponent } from './plantillas-componet.component';

describe('PlantillasComponetComponent', () => {
  let component: PlantillasComponetComponent;
  let fixture: ComponentFixture<PlantillasComponetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillasComponetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillasComponetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
