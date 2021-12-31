import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadComponent } from './entidad.component';

describe('InicioComponent', () => {
  let component: EntidadComponent;
  let fixture: ComponentFixture<EntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
