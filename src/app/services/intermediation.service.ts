import { Injectable} from '@angular/core';
import Konva from 'konva';
import { Mesh } from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader'

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
  private _canvas: any;
  private _context: any;
  private _rendered_sketch: string = '';
  private _painting_mode: string = 'brush';
  private _mesh: Mesh | any;
  private loader: PLYLoader = new PLYLoader();
  private _mesh_ready: Promise<boolean> = Promise.resolve(false);
  private _camera_position: any = {
    Azimuthal: 0,
    Polar: 0,
    Distance: 0
  }

  public set sketch_stage(stage: Konva.Stage) {
    this._sketch_stage = stage;
  }

  public get sketch_stage(): Konva.Stage {
    return this._sketch_stage;
  }

  public get canvas(): any {
    return this._canvas;
  }

  public set canvas(canvas: any) {
    this._canvas = canvas;
  }

  public set context(context: any) {
    this._context = context;
  }

  public get context(): any {
    return this._context;
  }

  public get rendered_sketch(): string {
    return this._rendered_sketch;
  }

  public set rendered_sketch(sketch: string) {
    this._rendered_sketch = sketch;
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

  public get mesh_ready(): Promise<boolean> {
    return this._mesh_ready;
  }

  public get_image_data(): string {
    return this._sketch_stage.toDataURL();
  }

  public get camera_position(): any {
    return this._camera_position;
  }

  public set camera_position(position: any) {
    this._camera_position = position;
  }
  
  public initalize_sketch_pad(): void {
    let self = this;
    this.sketch_temp_obj.src = this.sketch_temp_image_base64;
    let stage: Konva.Stage = new Konva.Stage({
      container: 'sketch-pad-container',
      // width: 658.7,
      // height: 592.138
      width: 512,
      height: 512
    });
    
    let layer: Konva.Layer = new Konva.Layer();
    stage.add(layer);
    // then we are going to draw into special canvas element
    let canvas = document.createElement('canvas');
    canvas.width = stage.width();
    canvas.height = stage.height();
    let ctx = canvas.getContext("2d");
    this.sketch_temp_obj.onload = function () {
      ctx!.drawImage(self.sketch_temp_obj, 0, 0);
    }
    // created canvas we can add to layer as "Konva.Image" element
    var image = new Konva.Image({
      image: canvas,
      x: 0,
      y: 0,
      fill: 'white',
    });
    
    // let image: Konva.Image = new Konva.Image({
    //   image: this.sketch_temp_obj,
    //   x: 0,
    //   y: 0,
    //   width: canvas.width,
    //   height: canvas.height,
    //   fill: 'white',
    // }
    // );
    layer.add(image);
    // layer.add(image);
    // Good. Now we need to get access to context element
    let context = canvas.getContext('2d')!;
    context.strokeStyle = '#000';
    context.lineJoin = 'round';
    context.lineWidth = 3;
    // pass the stage to the intermediation service
    this.sketch_stage = stage;

    let is_painting: boolean = false;
    let last_point_position: any;
    // let self = this;

    // now we need to bind some events
    // we need to start drawing on mousedown
    // and stop drawing on mouseup
    image.on('mousedown touchstart', function () {
      if (self.painting_mode === 'brush') {
        context.strokeStyle = '#000';
        context.lineWidth = 3;
      } else {
        context.strokeStyle = '#fff';
        context.lineWidth = 30;
      }
      is_painting = true;
      last_point_position = stage.getPointerPosition();
    });

    // will it be better to listen move/end events on the window?

    stage.on('mouseup touchend', function () {
      is_painting = false;
      self.sketch_stage = stage;
    });


    // and core function - drawing
    stage.on('mousemove touchmove', function () {
      if (!is_painting) {
        return;
      }

      if (self.painting_mode === 'brush') {
        context.globalCompositeOperation = 'source-over';
      }
      if (self.painting_mode === 'eraser') {
        context.globalCompositeOperation = 'destination-out';
      }
      context.beginPath();

      var localPos = {
        x: last_point_position.x - image.x(),
        y: last_point_position.y - image.y(),
      };
      context.moveTo(localPos.x, localPos.y);
      var pos = stage.getPointerPosition()!;
      localPos = {
        x: pos.x - image.x(),
        y: pos.y - image.y(),
      };
      context.lineTo(localPos.x, localPos.y);
      context.closePath();
      context.stroke();

      last_point_position = pos;
      // redraw manually
      layer.batchDraw();
    });
  }

  public complete_drawing(): void {
    let sketch_image = this.get_image_data()
    let data = {
      sketch_image: sketch_image
    };
    let self = this;
    
    this.http.get_mesh(data).subscribe(
      (data: any) => {
        let model_ply_str = data.mesh;
        // load ply model
        self.mesh = new Mesh(self.loader.parse(model_ply_str));
        self._mesh_ready = Promise.resolve(true);
      }, (error: any) => {
        console.log(error);
      }
    ), (error: any) => {
      console.log(error);
    }
  }

  public optimize_mesh(): void {
    let sketch_image = this.get_image_data()
    let data = {
      sketch_edited: sketch_image
    }
    let self = this;

    this.http.optimize_mesh(data).subscribe(
      (data: any) => {
        let model_ply_str = data.mesh;
        // load ply model
        self.mesh = new Mesh(self.loader.parse(model_ply_str));
        self._mesh_ready = Promise.resolve(true);
      }
    ), (error: any) => {
      console.log(error);
    }
  }

  public get_rendered_sketch(): void {
    let data = {
      camera_position: this.camera_position
    }
    let self = this;

    this.http.get_rendered_sketch(data).subscribe(
      (data: any) => {
        self.rendered_sketch = 'data:image/png;base64,' + data.rendered_sketch;
        self.set_rendered_sketch();
      }
    ), (error: any) => {
      console.log(error);
    }

  }

  public set_rendered_sketch(): void {
    let self = this;
    this.rendered_sketch_obj.src = this.rendered_sketch;
    let width = this.sketch_stage.width()
    let height = this.sketch_stage.height()
    let stage: Konva.Stage = new Konva.Stage({
      container: 'sketch-pad-container',
      width: 512,
      height: 512
    });
    
    let layer: Konva.Layer = new Konva.Layer();
    stage.add(layer);
    // then we are going to draw into special canvas element
    let canvas = document.createElement('canvas');
    // Good. Now we need to get access to context element
    let context = canvas.getContext('2d')!;
    this.rendered_sketch_obj.onload = function () { 
      context.drawImage(self.rendered_sketch_obj, 0, 0, width, height);
    }
    canvas.width = stage.width();
    canvas.height = stage.height();
    
    let image: Konva.Image = new Konva.Image({
      image: canvas,
      width: width,
      height: height,
      
    }
    );
    layer.add(image);
    // context.fillStyle = 'blue';
    // context.fillRect(5, 5, canvas.width - 10, canvas.height / 2);
    context.fill();
    context.strokeStyle = '#000';
    context.lineJoin = 'round';
    context.lineWidth = 3;
    // layer.add(sketch_temp_image);
    // pass the stage to the intermediation service
    this.sketch_stage = stage;

    let is_painting: boolean = false;
    let last_point_position: any;

    // now we need to bind some events
    // we need to start drawing on mousedown
    // and stop drawing on mouseup
    image.on('mousedown touchstart', function () {
      if (self.painting_mode === 'brush') {
        context.strokeStyle = '#000';
        context.lineWidth = 3;
      } else {
        context.strokeStyle = '#fff';
        context.lineWidth = 30;
      }
      is_painting = true;
      last_point_position = stage.getPointerPosition();
    });

    // will it be better to listen move/end events on the window?

    stage.on('mouseup touchend', function () {
      is_painting = false;
      self.sketch_stage = stage;
    });


    // and core function - drawing
    stage.on('mousemove touchmove', function () {
      if (!is_painting) {
        return;
      }

      if (self.painting_mode === 'brush') {
        context.globalCompositeOperation = 'source-over';
      }
      if (self.painting_mode === 'eraser') {
        context.globalCompositeOperation = 'destination-out';
      }
      context.beginPath();

      var localPos = {
        x: last_point_position.x - image.x(),
        y: last_point_position.y - image.y(),
      };
      context.moveTo(localPos.x, localPos.y);
      var pos = stage.getPointerPosition()!;
      localPos = {
        x: pos.x - image.x(),
        y: pos.y - image.y(),
      };
      context.lineTo(localPos.x, localPos.y);
      context.closePath();
      context.stroke();

      last_point_position = pos;
      // redraw manually
      layer.batchDraw();
    });
  }


  public degToRad(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  public radToDeg(rad: number): number {
    return rad / (Math.PI / 180);
  }

  private sketch_temp_obj = new Image();
  private rendered_sketch_obj = new Image();

  public sketch_temp_image_base64: string = "data:image/png;base64, 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"
}
