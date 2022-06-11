import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// import components
import { Sketch2meshComponent } from './sketch2mesh.component';

const Sketch2meshRoutes: Routes = [
  {
    path: '',
    component: Sketch2meshComponent,
    children: [
      {
        path: '**',
        redirectTo: 'sketch2mesh'
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(Sketch2meshRoutes)
  ],
  exports: [RouterModule]
})
export class Sketch2meshRoutingModule { }
