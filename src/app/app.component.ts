import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  value = '';
  valueSubject = new Subject();
  title = 'app';

  scouts: FirebaseListObservable <any[]>;
  constructor(db: AngularFireDatabase) {
    this.scouts = db.list('/scouts', {
      query: {
        orderByKey: true,
        equalTo: this.valueSubject,
        limitToFirst: 1
      }
    });
  }

  update(value: string) {
    this.value = value;
    this.valueSubject.next(value);
    setTimeout(() => this.value = '', 1000);
  }
}
