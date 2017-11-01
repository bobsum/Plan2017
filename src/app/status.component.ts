import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html'
})
export class StatusComponent implements OnInit {
  scouts$: Observable<any>;
  rooms$: Observable<any>;
  arrived$: Observable<any>;
  missing$: Observable<any>;

    constructor(
      private db: AngularFireDatabase
    ) {}
  
    ngOnInit() {
      this.scouts$ = this.db.list('/scouts')
      this.rooms$ = this.db.list('/rooms').combineLatest(this.scouts$, (rooms, scouts) => {
        return rooms.map(room => {
          return {
            name: room.name,
            count: scouts.filter(s => (s.rooms || []).includes(room.$key)).length
          };
        });
      });

      this.arrived$ = this.scouts$.map(scouts => scouts.filter(scout => scout.arrived).length);
      this.missing$ = this.scouts$.map(scouts => scouts
        .filter(scout => (scout.rooms || []).length < 6)
      );
    }
}
