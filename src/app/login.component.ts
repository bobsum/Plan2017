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

  constructor(
    private router: Router, 
    private db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.db.list('/scouts', {
      query: {
        orderByKey: true,
        equalTo: this.value$,
        limitToFirst: 1
      }
    }).subscribe(scouts => {
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
