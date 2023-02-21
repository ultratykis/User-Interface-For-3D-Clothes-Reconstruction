import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgtRenderState } from '@angular-three/core';
import { Mesh, MeshNormalMaterial, MeshNormalMaterialParameters, MeshPhongMaterialParameters, MeshStandardMaterialParameters } from 'three';
import { Observable } from 'rxjs';

// import services
import { IntermediationService } from 'src/app/services/intermediation.service';
import * as THREE from 'three';
@Component({
  selector: 'app-mesh',
  templateUrl: './mesh.component.html',
  styleUrls: ['./mesh.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
  
export class MeshComponent implements OnInit {
  
  public get model(): Mesh {
    let mesh = this.inter.mesh;
    let geometry = mesh.geometry;
    geometry.computeVertexNormals();
    return mesh;
  }

  public parameters_normal: MeshNormalMaterialParameters = {
    flatShading: false
  }

  public parameters_phong: MeshPhongMaterialParameters = {
    flatShading: false,
    color: '#c8c8c8',
    specular: '#000000',
    shininess: 50,
    reflectivity: 1.0,
    opacity: 1.0,
  }

  public parameters_standard: MeshStandardMaterialParameters = {
    flatShading: false,
    color: '#2e2e2e',
    roughness: 0,
    metalness: 1.0,
    emissive: '#000000'
  }

  constructor(
    private inter: IntermediationService
  ) { }

  ngOnInit(): void {
  }

  private _hovered: boolean = false;
  private _active: boolean = false;

  onBeforeRender($event: { state: NgtRenderState; object: Mesh }) {
    const model = $event.object;
  }

  public get hovered(): boolean {
    return this._hovered;
  }

  public set hovered(value: boolean) {
    this._hovered = value;
  }

  public get active(): boolean {
    return this._active;
  }

  public set active(value: boolean) {
    this._active = value;
  }

}
