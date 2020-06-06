import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumsComponent } from "./albums/albums.component";
import { AlbumDetailComponent } from "./album-detail/album-detail.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: 'home', component: AlbumsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'album/:id', component: AlbumDetailComponent },
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
