import { Component, OnInit } from '@angular/core';
import Konva from 'konva';

// import services
import { IntermediationService } from 'src/app/services/intermediation.service';

@Component({
  selector: 'app-sketch-pad',
  templateUrl: './sketch-pad.component.html',
  styleUrls: ['./sketch-pad.component.scss']
})

export class SketchPadComponent implements OnInit {

  constructor(
    private inter: IntermediationService
  ) { 
    this.mode = this.inter.painting_mode;
  }

  private mode: string = 'brush';

  ngOnInit(): void {
    let stage: Konva.Stage = new Konva.Stage({
      container: 'sketch-pad-container',
      width: 768,
      height: 768
    });
    // pass the stage to the intermediation service
    this.inter.sketch_stage = stage;

    let layer: Konva.Layer = new Konva.Layer();
    stage.add(layer);

    let is_painting: boolean = false;
    let last_line: Konva.Line;
    let self = this;

    stage.on('mousedown touchstart', function (e) {
      is_painting = true;
      // set mode from IntermediationService
      self.mode = self.inter.painting_mode;
      // let pos: Konva.Node  = stage.getPointerPosition();
      let pos: any = stage.getPointerPosition();
      last_line = new Konva.Line({
        stroke: self.mode === 'brush' ? '#000' : '#fff',
        strokeWidth: self.mode === 'brush' ? 5 : 15,
        globalCompositeOperation:
          self.mode === 'brush' ? 'source-over' : 'destination-out',
        // round cap for smoother lines
        lineCap: 'round',
        // add point twice, so we have some drawings even on a simple click
        points: [pos.x, pos.y, pos.x, pos.y]
      });
      layer.add(last_line);
    });

    stage.on('mouseup touchend', function (e) {
      is_painting = false;
      self.inter.sketch_stage = stage;
    });

    // and core function - drawing
    stage.on('mousemove touchmove', function (e) {
      if (!is_painting) {
        return;
      }

      // prevent scrolling on touch devices
      e.evt.preventDefault();

      const pos: any = stage.getPointerPosition();
      let new_points: any = last_line.points().concat([pos.x, pos.y]); // need to get the type to replace the any
      last_line.points(new_points);
    });
  }

}
