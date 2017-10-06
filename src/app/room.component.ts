import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/combineLatest';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html'
})
export class RoomComponent implements OnInit {
  name: string;
  room$: FirebaseObjectObservable<any>;
  scouts$: FirebaseListObservable<any>;
  scouts: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFireDatabase
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.room$ = this.db.object(`/rooms/${id}`);
    this.scouts$ = this.db.list('/scouts', {
      query: {
        orderByChild: 'currentRoom',
        equalTo: id,
      }
    });
    this.scouts$.subscribe(scouts => this.scouts = scouts);
  }

  done() {
    this.scouts.forEach(scout => {
      this.scouts$.update(scout.$key, { currentRoom: null });
    });
    this.room$.update({ isFree: true });
  }
}
