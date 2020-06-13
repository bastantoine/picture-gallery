import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { Album } from "../models";
import { AlbumsService } from "../albums.service";

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
    private albumService: AlbumsService
  ) { }

  ngOnInit(): void {
    this.album = new Album(0, '', '', new Date(), [])
    this.getAlbum(0)
  }

  getAlbum(id: number): void {
    id = +this.route.snapshot.paramMap.get('id');
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
        err => this.router.navigate(['/not-found'])
      );
  }

}
