import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { KeyComponent } from './key.component';
import { KeypadComponent } from './keypad.component';
import { QueueScoutComponent } from './queue-scout.component';

@NgModule({
  declarations: [
    AppComponent,
    KeyComponent,
    KeypadComponent,
    QueueScoutComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
