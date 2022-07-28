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
  private rendered_sketch_obj = new Image();

  public rendered_sketch(): void {
    this.rendered_sketch_obj.src = this.inter.rendered_sketch;
    let rendered_sketch_image: Konva.Image = new Konva.Image({
      width: 768,
      height: 768,
      image: this.rendered_sketch_obj
    }
    );
    this.inter.sketch_stage = new Konva.Stage({
      container: 'sketch-pad-container',
      width: 768,
      height: 768
    });
    this.inter.sketch_stage.container().style.backgroundColor = '#fff';
    let layer: Konva.Layer = new Konva.Layer();
    this.inter.sketch_stage.add(layer);
    layer.add(rendered_sketch_image);
  }

  constructor(
    private inter: IntermediationService
  ) { }

  ngOnInit(): void {
    this.inter.initalize_sketch_pad();
  }

}
