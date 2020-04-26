import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs";

import { Album } from "../models";
import { AlbumsService } from "../albums.service";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.sass']
})
export class AlbumsComponent implements OnInit {

  albums: Observable<Album[]>;

  constructor(private albumsService: AlbumsService) { }

  ngOnInit(): void {
    this.getAllAlbums();
  }

  getAllAlbums(): void {
    this.albums = this.albumsService.getAllAlbums();
  }

}
