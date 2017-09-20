import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-keypad',
  templateUrl: './keypad.component.html'
})
export class KeypadComponent {
  sequence: number[] = [];
  @Input() digits = 6;

  get value(): string {
    return this.sequence.join('');
  }
  @Input() set value(value: string) {
    value = value.slice(0, this.digits);
    const sequence = [];
    for (let i = 0; i < value.length; i++) {
      sequence.push(+value[i]);
    }
    this.sequence = sequence;
  }

  @Output() valueChange = new EventEmitter<string>();

  add(digit: number) {
    if (this.sequence.length === this.digits) {
      return;
    }
    this.sequence.push(digit);
    if (this.sequence.length === this.digits) {
      this.valueChange.emit(this.value);
    }
  }

  remove() {
    this.sequence.pop();
  }
}
