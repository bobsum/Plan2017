import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import 'hammerjs';
import 'hammer-timejs';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { KeyComponent } from './key.component';
import { KeypadComponent } from './keypad.component';
import { LoginComponent } from './login.component';
import { QueueScoutComponent } from './queue-scout.component';
import { HandScanComponent } from './hand-scan.component';

@NgModule({
  declarations: [
    AppComponent,
    KeyComponent,
    KeypadComponent,
    QueueScoutComponent,
    LoginComponent,
    HandScanComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
