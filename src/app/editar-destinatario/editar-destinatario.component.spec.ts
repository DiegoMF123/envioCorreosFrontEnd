import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDestinatarioComponent } from './editar-destinatario.component';

describe('EditarDestinatarioComponent', () => {
  let component: EditarDestinatarioComponent;
  let fixture: ComponentFixture<EditarDestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarDestinatarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
