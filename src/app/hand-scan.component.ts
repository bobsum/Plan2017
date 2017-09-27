import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-hand-scan',
  templateUrl: './hand-scan.component.html'
})
export class HandScanComponent implements OnInit {
  timeouts = [];
  down = [false, false, false, false, false];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
    // todo load scout object
  }

  add(index) {
    this.remove(index);
    this.timeouts[index] = setTimeout(() => this.down[index] = true, 1000);
  }

  remove(index) {
    clearTimeout(this.timeouts[index]);
  }

  isDown(index) {
    return this.down[index];
  }

  isOk() {
    for (let i = 0; i < this.down.length; i++) {
      if (!this.down[i]) {
        return false;
      }
    }
    return true;
  }
}
