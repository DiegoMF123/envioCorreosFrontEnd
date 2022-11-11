import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionPlantillasComponent } from './opcion-plantillas.component';

describe('OpcionPlantillasComponent', () => {
  let component: OpcionPlantillasComponent;
  let fixture: ComponentFixture<OpcionPlantillasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcionPlantillasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionPlantillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
