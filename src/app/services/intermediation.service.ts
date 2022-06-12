import { Injectable } from '@angular/core';
import Konva from 'konva';

// import services
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})

export class IntermediationService {

  constructor(
    private http: HttpService
  ) { }

  private _sketch_stage: any;
  private _painting_mode: string = 'brush';
  private _mesh: any;

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

  public get_image_data(): string {
    return this._sketch_stage.toDataURL();
  }

  public complete_drawing(): string {
    let generation_result: any = this.http.post_sketch(this.get_image_data());
    return 'Success';
  }

}
