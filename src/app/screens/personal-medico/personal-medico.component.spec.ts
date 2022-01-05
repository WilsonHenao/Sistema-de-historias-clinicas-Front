import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalMedicoComponent } from "./personal-medico.component";

describe('PersonalMedicoComponent', () => {
  let component: PersonalMedicoComponent;
  let fixture: ComponentFixture<PersonalMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
