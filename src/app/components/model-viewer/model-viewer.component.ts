import { Component, OnInit } from '@angular/core';
import { NgtRenderState } from '@angular-three/core';
import { Mesh, WebGLRenderer } from 'three';

// import services
import { IntermediationService } from 'src/app/services/intermediation.service';

@Component({
  selector: 'app-model-viewer',
  templateUrl: './model-viewer.component.html',
  styleUrls: ['./model-viewer.component.scss']
})
export class ModelViewerComponent implements OnInit {

  public renderer: any;

  constructor(
    private inter: IntermediationService
  ) { 
  }

  ngOnInit(): void {
  }

  public getCreated($event: any) {
    console.log("mesh canvas get created.")
    this.renderer = $event.gl;
  }


  public get mesh_ready(): Promise<boolean> {
    return this.inter.mesh_ready;
  }

  public get_camera($event: any): void {
    let azimuthal = this.inter.radToDeg($event.target.getAzimuthalAngle());
    let polar = this.inter.radToDeg($event.target.getPolarAngle());
    let distance = $event.target.getDistance();
    this.inter.camera_position = {
      Azimuthal: azimuthal,
      Polar: polar,
      Distance: distance,
    };
  }

}
