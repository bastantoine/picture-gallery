import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumsComponent } from "./albums/albums.component";
import { AlbumDetailComponent } from "./album-detail/album-detail.component";


@NgModule({
  declarations: [
    AlbumsComponent,
    AlbumDetailComponent,
  ],
  imports: [
    CommonModule,
    AlbumRoutingModule
  ]
})
export class AlbumModule { }
