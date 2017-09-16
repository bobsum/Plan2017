import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KeyComponent } from './key.component';
import { KeypadComponent } from './keypad.component';

@NgModule({
  declarations: [
    AppComponent,
    KeyComponent,
    KeypadComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
