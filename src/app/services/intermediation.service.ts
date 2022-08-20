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
    this.sketch_temp_obj.src = this.sketch_temp_image_base64;
    let stage: Konva.Stage = new Konva.Stage({
      container: 'sketch-pad-container',
      width: 658.7,
      height: 592.138
    });
    
    let layer: Konva.Layer = new Konva.Layer();
    stage.add(layer);
    // then we are going to draw into special canvas element
    let canvas = document.createElement('canvas');
    canvas.width = stage.width();
    canvas.height = stage.height();
    // created canvas we can add to layer as "Konva.Image" element
    var image = new Konva.Image({
      image: canvas,
      x: 0,
      y: 0,
      fill: 'white',
    });
    
    let sketch_temp_image: Konva.Image = new Konva.Image({
      image: this.sketch_temp_obj,
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height,
      fill: 'white',
    }
    );
    layer.add(image);
    // Good. Now we need to get access to context element
    let context = canvas.getContext('2d')!;
    context.strokeStyle = '#000';
    context.lineJoin = 'round';
    context.lineWidth = 3;
    // layer.add(sketch_temp_image);
    // pass the stage to the intermediation service
    this.sketch_stage = stage;

    let is_painting: boolean = false;
    let last_point_position: any;
    let self = this;

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
    let data = {
      state: this.camera_position
    }
    let self = this;

    this.http.optimize_mesh(data).subscribe(
      (data: any) => {
        let model_ply_str = data.mesh;
        // load ply model
        self.mesh = new Mesh(self.loader.parse(model_ply_str));
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
      width: 658.7,
      height: 592.138
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

  private sketch_temp_obj = new Image();
  private rendered_sketch_obj = new Image();

  public sketch_temp_image_base64: string = "data:image/png;base64,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"
}
