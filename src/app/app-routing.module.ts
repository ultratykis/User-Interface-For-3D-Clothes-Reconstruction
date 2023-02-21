import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sketch2mesh',
    pathMatch: 'full'
  },
  {
    path: 'sketch2mesh',
    loadChildren: () =>
      import('./pages/sketch2mesh/sketch2mesh.module').then(
        (m) => m.Sketch2meshModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
