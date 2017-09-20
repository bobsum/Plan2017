import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  value: string = '';
  title = 'app';

  rooms: FirebaseListObservable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.rooms = db.list('/rooms');
  }

  update(value: string) {
    this.value = value;
    setTimeout(()=>this.value = '', 1000);
  }
}
