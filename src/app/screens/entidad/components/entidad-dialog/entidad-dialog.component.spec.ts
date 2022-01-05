import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadDialogComponent } from './entidad-dialog.component';

describe('EntidadDialogComponent', () => {
  let component: EntidadDialogComponent;
  let fixture: ComponentFixture<EntidadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntidadDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntidadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
