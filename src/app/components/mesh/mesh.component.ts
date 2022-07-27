import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgtRenderState, NgtLoader } from '@angular-three/core';
import { Mesh, MeshNormalMaterial } from 'three';
// import services
import { IntermediationService } from 'src/app/services/intermediation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mesh',
  templateUrl: './mesh.component.html',
  styleUrls: ['./mesh.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
  
export class MeshComponent implements OnInit {
  
  public get model(): Mesh {
    return this.inter.mesh;
  }

  constructor(
    private inter: IntermediationService
  ) { 
    // this.model$ = this.loadObj();
  }

  ngOnInit(): void {
  }

  private _hovered: boolean = false;
  private _active: boolean = false;

  onBeforeRender($event: { state: NgtRenderState; object: Mesh }) {
    const cube = $event.object;
    // we are rotating our cube little by little before it gets rendered
    // cube.rotation.x += 0.01;
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
