import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  value: string = '';
  title = 'app';

  update(value: string) {
    this.value = value;
    setTimeout(()=>this.value = '', 1000);
  }
}
