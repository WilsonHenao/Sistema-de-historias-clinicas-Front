import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalMedicoRoutingModule } from './personal-medico-routing.module';
import { PersonalMedicoComponent } from "./personal-medico.component";
import { PersonalMedicoDialogComponent } from './components/personal-medico-dialog/personal-medico-dialog.component';
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
import { MultiSelectModule } from 'primeng/multiselect';



@NgModule({
  declarations: [
    PersonalMedicoComponent,
    PersonalMedicoDialogComponent
  ],
  imports: [
    CommonModule,
    PersonalMedicoRoutingModule,
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
    MultiSelectModule
  ]
})
export class PersonalMedicoModule { }
