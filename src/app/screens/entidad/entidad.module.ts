import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntidadComponent } from './entidad.component';
import { EntidadRoutingModule } from './entidad-routing.module';

import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';


@NgModule({
  declarations: [
    EntidadComponent
  ],
  imports: [
    CommonModule,
    EntidadRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule
  ]
})
export class EntidadModule { }
