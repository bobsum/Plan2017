import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  rooms$: FirebaseListObservable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.afAuth.auth.signInAnonymously()
      .then(() => {
        this.rooms$ = this.db.list('/rooms');    
      });
  }
}
