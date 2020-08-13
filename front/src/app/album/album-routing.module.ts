import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AlbumsComponent } from './albums/albums.component';


const routes: Routes = [
  { path: 'i/:id', component: AlbumDetailComponent, data: { type: 'id' } },
  { path: 'u/:uuid', component: AlbumDetailComponent, data: { type: 'uuid' } },
  { path: '', component: AlbumsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRoutingModule { }
