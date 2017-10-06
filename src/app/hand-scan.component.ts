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
  name: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.scout$ = this.db.object(`/scouts/${id}`);
    this.scout$.subscribe(s => this.name = s.name);
  }

  add(index: number) {
    this.remove(index);
    this.timeouts[index] = setTimeout(() => this.accept(index), 700);
  }

  remove(index: number) {
    clearTimeout(this.timeouts[index]);
  }

  accept(index: number) {
    this.down[index] = true;
    if (!this.isOk()) {
      return;
    }

    const utter = new SpeechSynthesisUtterance(`Velkommen ${this.name}`);
    window.speechSynthesis.speak(utter);
    this.scout$.update({ arrived: true });
    setTimeout(() => this.router.navigate(['/login']), 10000);
  }

  isDown(index: number) {
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
