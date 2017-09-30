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
  soundEnabled = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.scout$ = this.db.object(`/scouts/${id}`);
    this.scout$.subscribe(s => console.log(s));
  }

  add(index: number) {
    this.remove(index);
    this.timeouts[index] = setTimeout(() => this.accept(index), 1000);
  }

  remove(index: number) {
    clearTimeout(this.timeouts[index]);
  }

  accept(index: number) {
    this.down[index] = true;
    if (this.isOk()) {
      this.play('Rasmus Jensen');
    }
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

  play(value) {
    const msg = new SpeechSynthesisUtterance(value);
    msg.onend = () => console.log('Utterance has finished being spoken after');
    window.speechSynthesis.speak(msg);
  }

  enableSound() {
    if (!this.soundEnabled) {
      this.play(' ');
      this.soundEnabled = true;
    }
  }
}
