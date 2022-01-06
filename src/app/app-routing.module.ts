import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'entidad', 
    loadChildren: () => import('./screens/entidad/entidad.module').then(m => m.EntidadModule)
  },
  {
    path: 'personal', 
    loadChildren: () => import('./screens/personal-medico/personal-medico.module').then(m => m.PersonalMedicoModule)
  },
  {
    path: 'paciente', 
    loadChildren: () => import('./screens/paciente/paciente.module').then(m => m.PacienteModule)
  },
  {
    path: 'historia_clinica', 
    loadChildren: () => import('./screens/historia-clinica/historia-clinica.module').then(m => m.HistoriaClinicaModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'entidad' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
