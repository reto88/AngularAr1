import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./home/home.component";
import {ScanComponent} from './scan/scan.component';
import {QrComponent} from "./qr/qr.component";
import {CanvasComponent} from "./canvas/canvas.component";
import {VersionComponent} from "./version/version.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'scan', component: ScanComponent },
  { path: 'qr', component: QrComponent },
  { path: 'canvas', component: CanvasComponent },
  { path: 'version', component: VersionComponent },


];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
