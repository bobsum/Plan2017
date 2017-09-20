import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-queue-scout',
  templateUrl: './queue-scout.component.html'
})
export class QueueScoutComponent {
  @Input() name: string;
  @Input() scouts: string[];
}
