import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { NgtCanvasModule } from "@angular-three/core";
import { NgtMeshModule } from "@angular-three/core/meshes";
import { NgtMeshStandardMaterialModule, NgtMeshBasicMaterialModule  } from "@angular-three/core/materials";
import { NgtBoxGeometryModule } from "@angular-three/core/geometries";
import {
  NgtAmbientLightModule,
  NgtSpotLightModule,
  NgtPointLightModule
} from "@angular-three/core/lights";
import { NgtSobaOrbitControlsModule } from "@angular-three/soba/controls";
import { NgtPrimitiveModule } from '@angular-three/core/primitive';

const ThreeModules = [
  NgtCanvasModule,
  NgtMeshModule,
  NgtMeshStandardMaterialModule,
  NgtBoxGeometryModule,
  NgtAmbientLightModule,
  NgtSpotLightModule,
  NgtPointLightModule,
  NgtMeshBasicMaterialModule,
  NgtSobaOrbitControlsModule,
  NgtPrimitiveModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ThreeModules
  ],
  exports: [ThreeModules]
})
export class ThreeModule { }
