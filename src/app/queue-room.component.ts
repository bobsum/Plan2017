import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-queue-room',
  templateUrl: './queue-room.component.html'
})
export class QueueRoomComponent {
  @Input() name: string;
  @Input() scouts: string[];
}
