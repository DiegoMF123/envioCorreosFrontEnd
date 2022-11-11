import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSobreComponent } from './crear-sobre.component';

describe('CrearSobreComponent', () => {
  let component: CrearSobreComponent;
  let fixture: ComponentFixture<CrearSobreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearSobreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSobreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
