import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HandScanComponent } from './hand-scan.component';
import { LoginComponent } from './login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/:id', component: HandScanComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' }
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