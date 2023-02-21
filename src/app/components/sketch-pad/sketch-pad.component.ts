import { Component, OnInit} from '@angular/core';
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
  ) { }

  ngOnInit(): void {
    this.inter.initalize_sketch_pad();
  }

}
