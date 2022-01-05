import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalMedicoDialogComponent } from './personal-medico-dialog.component';

describe('PersonalMedicoDialogComponent', () => {
  let component: PersonalMedicoDialogComponent;
  let fixture: ComponentFixture<PersonalMedicoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalMedicoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalMedicoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
