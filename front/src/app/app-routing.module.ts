import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumsComponent } from "./albums/albums.component";
import { AlbumDetailComponent } from "./album-detail/album-detail.component";

const routes: Routes = [
  { path: 'home', component: AlbumsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'album/:id', component: AlbumDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
