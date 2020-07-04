import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { tap } from "rxjs/operators";

import { Album } from "../models";
import { AlbumsService } from "../services/albums.service";
import { AlbumUuidService } from "../services/album-uuid.service";

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.sass']
})
export class AlbumDetailComponent implements OnInit {

  album: Album;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private albumService: AlbumsService,
    private albumsUUIDService: AlbumUuidService
  ) { }

  ngOnInit(): void {
    this.album = new Album(-1, '', '', new Date(), [])
    this.getAlbum()
  }

  getAlbum(): void {
    let routeType = this.route.snapshot.data.type; // Either 'id' or 'uuid'
    if(routeType === 'uuid') {
      let uuid = this.route.snapshot.paramMap.get('uuid');
      // We got a UUID, lets call the AlbumsUUIDService to get the info of the album.
      // When we pass the UUID of the album, if it matches it will returns directly the infos of the album
      this.albumsUUIDService.getAlbumFromUUID(uuid)
        .subscribe(
          album => this.album = new Album(
            album['id'],
            album['name'],
            album['url'],
            new Date(album['start_date']),
            album['pictures'],
            album['description'],
            new Date(album['end_date']),
          ),
          () => this.router.navigate(['/not-found'])
        );
    } else {
      let id = +this.route.snapshot.paramMap.get('id');
      this.albumService.getAlbumById(id)
        .subscribe(
          album => this.album = new Album(
            album['id'],
            album['name'],
            album['url'],
            new Date(album['start_date']),
            album['pictures'],
            album['description'],
            new Date(album['end_date']),
          ),
          () => this.router.navigate(['/not-found'])
        );
    }
  }
}
