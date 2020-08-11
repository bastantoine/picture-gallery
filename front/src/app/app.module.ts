import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from "./authentication/authentication.module";
import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PictureComponent } from './picture/picture.component';
import { JwtInterceptor } from "./jwt-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumDetailComponent,
    PageNotFoundComponent,
    PictureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthenticationModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
