import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlbumsComponent } from "./albums/albums.component";
import { AlbumDetailComponent } from "./album-detail/album-detail.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PictureComponent } from "./picture/picture.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";

const routes: Routes = [
  { path: 'home', component: AlbumsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'album/:id', component: AlbumDetailComponent, data: { type: 'id' } },
  { path: 'album/u/:uuid', component: AlbumDetailComponent, data: { type: 'uuid' } },
  { path: 'picture/:id', component: PictureComponent, data: { type: 'id' } },
  { path: 'picture/u/:uuid', component: PictureComponent, data: { type: 'uuid' } },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
