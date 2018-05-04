import { Component, OnInit } from '@angular/core';
import { PoubelleService } from "../poubelle.service";
import { Poubelle } from "./poubelle";

@Component({
  selector: 'app-poubelle',
  templateUrl: './poubelle.component.html',
  styleUrls: ['./poubelle.component.scss']
})
export class PoubelleComponent implements OnInit {
  poubelles = new Array(20);

  constructor(private poubelleService: PoubelleService) { }
  ngOnInit() {
    this.getPoubelles();
  }

  getPoubelles(): void {
    this.poubelleService.getPoubelles().subscribe(poubelles => {
      var p = poubelles;
      var len = poubelles.length;
      for (var i = 0; i < 20; i++) {
        for (var j = 0; j < len - 1; j++) {
          if (p[j].fillingLevel > p[j + 1].fillingLevel) {
            var q = p[j];
            p[j] = p[j + 1];
            p[j + 1] = q;
          }
        }
      }
      for (var i = 0; i < 20; i++) {
        this.poubelles[i] = p[len - 1 - i];
      }
    });
  }

}
