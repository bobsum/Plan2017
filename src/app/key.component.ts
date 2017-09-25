import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html'
})
export class KeyComponent {
  @Input() text: string;
  @Input() type = 'btn-outline-success';
}
