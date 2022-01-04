import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'entidad', 
    loadChildren: () => import('./screens/entidad/entidad.module').then(m => m.EntidadModule)
  },
  {
    path: 'personal', 
    loadChildren: () => import('./screens/entidad/entidad.module').then(m => m.EntidadModule)
  },
  {
    path: 'paciente', 
    loadChildren: () => import('./screens/entidad/entidad.module').then(m => m.EntidadModule)
  },
  {
    path: 'historia_clinica', 
    loadChildren: () => import('./screens/entidad/entidad.module').then(m => m.EntidadModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'entidad' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
