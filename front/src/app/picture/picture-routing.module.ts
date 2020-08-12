import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PictureComponent } from './picture/picture.component';


const routes: Routes = [
  { path: ':id', component: PictureComponent, data: { type: 'id' } },
  { path: 'u/:uuid', component: PictureComponent, data: { type: 'uuid' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PictureRoutingModule { }
