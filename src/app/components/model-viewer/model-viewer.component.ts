import { Component, OnInit } from '@angular/core';
import { NgtRenderState } from '@angular-three/core';
import { Mesh } from 'three';

// import services
import { IntermediationService } from 'src/app/services/intermediation.service';

@Component({
  selector: 'app-model-viewer',
  templateUrl: './model-viewer.component.html',
  styleUrls: ['./model-viewer.component.scss']
})
export class ModelViewerComponent implements OnInit {

  constructor(
    private inter: IntermediationService
  ) { }

  ngOnInit(): void {
  }

  public get mesh_ready(): Promise<boolean> {
    return this.inter.mesh_ready;
  }

  public get_camera($event: any): void {
    let azimuthal = $event.target.getAzimuthalAngle();
    let polar = $event.target.getPolarAngle();
    let distance = $event.target.getDistance();
    let snapshot = $event.target.domElement.toDataURL("image/png");
    this.inter.camera_position = {
      Azimuthal: azimuthal,
      Polar: polar,
      Distance: distance,
      Snapshot: snapshot
    };
  }

}
