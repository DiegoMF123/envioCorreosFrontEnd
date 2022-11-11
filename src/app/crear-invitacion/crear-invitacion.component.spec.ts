import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInvitacionComponent } from './crear-invitacion.component';

describe('CrearInvitacionComponent', () => {
  let component: CrearInvitacionComponent;
  let fixture: ComponentFixture<CrearInvitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearInvitacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearInvitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
