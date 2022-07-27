import { Injectable } from '@angular/core';
import Konva from 'konva';
import { Mesh, BufferGeometry, Float32BufferAttribute, MeshNormalMaterial, BufferAttribute, } from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

// import services
import { HttpService } from './http.service';
import { Byte } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})

export class IntermediationService {
  constructor(
    private http: HttpService
  ) { }

  private _sketch_stage: any;
  private _painting_mode: string = 'brush';
  private _mesh: Mesh | any;
  private loader: PLYLoader = new PLYLoader();

  public set sketch_stage(stage: Konva.Stage) {
    this._sketch_stage = stage;
  }

  public get painting_mode(): string {
    return this._painting_mode;
  }

  public set painting_mode(mode: string) {
    this._painting_mode = mode;
  }

  public get mesh(): any {
    return this._mesh; 
  }

  public set mesh(mesh: Mesh) {
    this._mesh = mesh;
  }

  public get_image_data(): string {
    return this._sketch_stage.toDataURL();
  }

  public complete_drawing(): void {
    let sketch_image = this.get_image_data()
    let data = {
      sketch_image: sketch_image
    };
    let self = this;
    
    this.http.get_mesh(data).subscribe(
      (data: any) => {
        let model_ply = data.mesh;
        // load ply model
        this.loader.load(model_ply, function (geometry) {
          let mesh = new Mesh(geometry, new MeshNormalMaterial());
          self._mesh = mesh;
        },
          function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          function (error) {
            console.log('An error happened: ' + error);
          }
        );
      }
    ), (error: any) => {
      console.log(error);
    }
  }
}
