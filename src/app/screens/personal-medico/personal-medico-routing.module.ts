import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalMedicoComponent } from "./personal-medico.component";

const routes: Routes = [
  {
    path: '',
    component: PersonalMedicoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalMedicoRoutingModule { }
