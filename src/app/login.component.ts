import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent{
  value = '';
  value$ = new Subject();
  title = 'app';

  scouts$: FirebaseListObservable <any[]>;
  constructor(private router: Router, db: AngularFireDatabase) {
    this.scouts$ = db.list('/scouts', {
      query: {
        orderByKey: true,
        equalTo: this.value$,
        limitToFirst: 1
      }
    });
    this.scouts$.subscribe(scouts => {
      if (scouts.length === 1) {
        this.router.navigate(['/login', scouts[0].$key]);
      }
    });
  }

  update(value: string) {
    this.value = value;
    this.value$.next(value);
    setTimeout(() => this.value = '', 1000);
  }
}
