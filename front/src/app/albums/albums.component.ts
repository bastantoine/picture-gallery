import { Component, OnInit } from '@angular/core';

import { Album } from "../models";
import { AlbumsService } from "../albums.service";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.sass']
})
export class AlbumsComponent implements OnInit {

  albums: Album[];

  constructor(private albumsService: AlbumsService) { }

  ngOnInit(): void {
    this.albums = [];
    this.getAllAlbums();
  }

  getAllAlbums(): void {
    this.albumsService.getAllAlbums()
      .subscribe(
        albums => {
          albums.forEach(album => this.albums.push(
            new Album(
              album['id'],
              album['name'],
              album['url'],
              album['start_date'],
              album['pictures'],
              album['description'],
              album['end_date'],
            )))
        }
      );
  }

}
