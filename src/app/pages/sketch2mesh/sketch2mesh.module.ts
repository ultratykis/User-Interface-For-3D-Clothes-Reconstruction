import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sketch2meshComponent } from './sketch2mesh.component';
import { Sketch2meshRoutingModule } from './sketch2mesh-routing.module';

// import angular material modules.
import { AngularMaterialModule } from '../../angular-material.module';

// import sketch2mesh components.
import { SketchPadComponent } from '../../components/sketch-pad/sketch-pad.component';
import { ModelViewerComponent } from '../../components/model-viewer/model-viewer.component';
import { GenerationProcessComponent } from '../../components/generation-process/generation-process.component';


@NgModule({
  declarations: [
    SketchPadComponent,
    ModelViewerComponent,
    Sketch2meshComponent,
    GenerationProcessComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    Sketch2meshRoutingModule
  ]
})
export class Sketch2meshModule { }
