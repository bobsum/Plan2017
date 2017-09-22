import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-hand-scan',
  templateUrl: './hand-scan.component.html'
})
export class HandScanComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
    //todo load scout object
  }
}
