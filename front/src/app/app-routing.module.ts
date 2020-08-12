import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { PictureComponent } from "./picture/picture.component";

const routes: Routes = [
  { 
    path: 'login',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'album',
    loadChildren: () => import('./album/album.module').then(m => m.AlbumModule)
  },
  { path: 'home', redirectTo: '/album/'},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'picture/:id', component: PictureComponent, data: { type: 'id' } },
  { path: 'picture/u/:uuid', component: PictureComponent, data: { type: 'uuid' } },
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
