import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { 
    path: 'login',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'album',
    loadChildren: () => import('./album/album.module').then(m => m.AlbumModule)
  },
  {
    path: 'picture',
    loadChildren: () => import('./picture/picture.module').then(m => m.PictureModule)
  },
  { path: 'home', redirectTo: '/album', pathMatch: 'full'},
  { path: '', redirectTo: '/album', pathMatch: 'full' },
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
