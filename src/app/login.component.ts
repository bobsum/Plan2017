import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  value = '';
  value$ = new Subject();
  title = 'app';

  soundEnabled = false;

  constructor(
    private router: Router,
    private db: AngularFireDatabase) {
  }

  ngOnInit() {
    const sub = this.db.list('/scouts', {
      query: {
        orderByKey: true,
        equalTo: this.value$,
        limitToFirst: 1
      }
    }).subscribe(scouts => {
      console.log('hit L');
      if (scouts.length === 1) {
        sub.unsubscribe();
        this.router.navigate(['/login', scouts[0].$key]);
      }
    });
  }

  update(value: string) {
    this.enableSound();
    this.value = value;
    this.value$.next(value);
    setTimeout(() => this.value = '', 1000);
  }

  enableSound() {
    if (!this.soundEnabled) {
      const utter = new SpeechSynthesisUtterance('');
      window.speechSynthesis.speak(utter);
      this.soundEnabled = true;
    }
  }
}
