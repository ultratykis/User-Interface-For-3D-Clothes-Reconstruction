import { Component, OnInit} from '@angular/core';
import Konva from 'konva';
// import services
import { IntermediationService } from '../../services/intermediation.service';

@Component({
  selector: 'app-sketch2mesh',
  templateUrl: './sketch2mesh.component.html',
  styleUrls: ['./sketch2mesh.component.scss']
})
export class Sketch2meshComponent implements OnInit {

  constructor(
    private inter: IntermediationService
  ) { }

  ngOnInit(): void {
  }


  public onDraw(): void {
    this.inter.painting_mode = 'brush';
  }

  public onErase(): void {
    this.inter.painting_mode = 'erase';
  }

  public onClear(): void {
    this.inter.initalize_sketch_pad()
  }

  public onSave(): void {
    this.inter.complete_drawing();
  }

  public onScreenshot(): void {
    this.inter.get_rendered_sketch();
  }

  public onRenew(): void {
    console.log('onRenew');
  }

  public onLoad(): void {
    console.log('onLoad');
  }

  public onDownload(): void {
    console.log('onDownload');
  }

}
