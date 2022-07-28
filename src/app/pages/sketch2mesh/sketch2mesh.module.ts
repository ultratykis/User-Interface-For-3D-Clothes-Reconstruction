import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sketch2meshComponent } from './sketch2mesh.component';
import { Sketch2meshRoutingModule } from './sketch2mesh-routing.module';

// import angular material modules.
import { AngularMaterialModule } from '../../angular-material.module';

// import mesh materials from angular three
import {
  NgtMeshNormalMaterialModule,
  NgtMeshStandardMaterialModule,
  NgtMeshPhysicalMaterialModule,
  NgtMeshLambertMaterialModule,
  NgtMeshPhongMaterialModule,
  NgtMeshToonMaterialModule,
  NgtMeshBasicMaterialModule,
  NgtMeshDepthMaterialModule,
} from '@angular-three/core/materials';

// import three.js modules.
import { ThreeModule } from '../../three.module';

// import sketch2mesh components.
import { SketchPadComponent } from '../../components/sketch-pad/sketch-pad.component';
import { ModelViewerComponent } from '../../components/model-viewer/model-viewer.component';
import { MeshComponent } from '../../components/mesh/mesh.component';


@NgModule({
  declarations: [
    SketchPadComponent,
    ModelViewerComponent,
    Sketch2meshComponent,
    MeshComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ThreeModule,
    Sketch2meshRoutingModule,
    NgtMeshNormalMaterialModule,
    NgtMeshStandardMaterialModule,
    NgtMeshPhysicalMaterialModule,
    NgtMeshLambertMaterialModule,
    NgtMeshPhongMaterialModule,
    NgtMeshToonMaterialModule,
    NgtMeshBasicMaterialModule,
    NgtMeshDepthMaterialModule,
  ]
})
export class Sketch2meshModule { }
