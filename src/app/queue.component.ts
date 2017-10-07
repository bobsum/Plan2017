import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html'
})
export class QueueComponent implements OnInit {
  rooms$: Observable<any>;

  constructor(
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.rooms$ = this.db.list('/rooms').combineLatest(this.db.list('/scouts'), (rooms, scouts) => {
      return rooms.map(room => {
        return {
          name: room.name,
          scouts: scouts.filter(s => room.$key === s.currentRoom)
        };
      });
    });
    const audio = new Audio('../assets/ding.mp3');
    this.rooms$
      .map(r => JSON.stringify(r))
      .distinctUntilChanged()
      .subscribe(() => {
        audio.play();
      });
  }
}
