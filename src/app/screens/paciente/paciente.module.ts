import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PacienteRoutingModule } from './paciente-routing.module';
import { PacienteComponent } from './paciente.component';
import { PacienteDialogComponent } from './components/paciente-dialog/paciente-dialog.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    PacienteComponent,
    PacienteDialogComponent
  ],
  imports: [
    CommonModule,
    PacienteRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class PacienteModule { }
