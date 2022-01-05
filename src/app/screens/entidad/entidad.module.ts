import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntidadComponent } from './entidad.component';
import { EntidadRoutingModule } from './entidad-routing.module';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';


import { EntidadDialogComponent } from './components/entidad-dialog/entidad-dialog.component';



@NgModule({
  declarations: [
    EntidadComponent,
    EntidadDialogComponent
  ],
  imports: [
    CommonModule,
    EntidadRoutingModule,
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
    ToastModule
  ]
})
export class EntidadModule { }
