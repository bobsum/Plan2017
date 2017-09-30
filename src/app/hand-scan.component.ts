import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-hand-scan',
  templateUrl: './hand-scan.component.html'
})
export class HandScanComponent implements OnInit {
  timeouts = [];
  down = [false, false, false, false, false];

  scout$: FirebaseObjectObservable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.scout$ = this.db.object(`/scouts/${id}`);
    this.scout$.subscribe(s => console.log(s));
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
