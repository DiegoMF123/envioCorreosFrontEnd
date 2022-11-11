import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteDestinatariosComponent } from './componente-destinatarios.component';

describe('ComponenteDestinatariosComponent', () => {
  let component: ComponenteDestinatariosComponent;
  let fixture: ComponentFixture<ComponenteDestinatariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteDestinatariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteDestinatariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
