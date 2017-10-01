import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HandScanComponent } from './hand-scan.component';
import { LoginComponent } from './login.component';
import { QueueComponent } from './queue.component';
import { RoomComponent } from './room.component';
import { MainComponent } from "./main.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/:id', component: HandScanComponent },
  { path: 'queue', component: QueueComponent },
  { path: 'room/:id', component: RoomComponent },
  { path: 'main', component: MainComponent },
  { path: '',   redirectTo: '/main', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
