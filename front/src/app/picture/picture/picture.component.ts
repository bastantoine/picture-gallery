import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { PicturesService } from "../../services/pictures.service";
import { AlbumsService } from "../../album/services/albums.service";
import { ExifsService } from "../../services/exifs.service";
import { PictureUUIDService } from "../../services/picture-uuid.service";
import { Picture, Exifs } from "../../models";

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.sass']
})
export class PictureComponent implements OnInit {

  picture: Picture;
  exifs: Exifs;
  albumName: string;
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pictureService: PicturesService,
    private albumService: AlbumsService,
    private exifsService: ExifsService,
    private pictureUUIDService: PictureUUIDService
  ) { }

  ngOnInit(): void {
    this.id = -1
    this.picture = new Picture(this.id, '', -1);
    this.albumName = '';
    this.getPicture();
  }

  getPicture(): void {
    let routeType = this.route.snapshot.data.type; // Either 'id' or 'uuid'
    if(routeType === 'uuid') {
      let uuid = this.route.snapshot.paramMap.get('uuid');
      this.pictureUUIDService.getPictureFromUUID(uuid)
      .subscribe(
        picture => {
          this.picture = new Picture(
            picture['id'],
            picture['path'],
            picture['album']
            );
            this.id = this.picture.id;
            this.getAlbumName();
            this.getExifs();
          },
          () => this.router.navigate(['/not-found'])
          );
    } else {
      this.id = +this.route.snapshot.paramMap.get('id');
      this.pictureService.getPictureById(this.id)
        .subscribe(
          picture => {
            this.picture = new Picture(
              picture['id'],
              picture['path'],
              picture['album']
            );
            this.getAlbumName();
            this.getExifs();
          },
          () => this.router.navigate(['/not-found'])
        );
    }
  }

  getExifs(): void {
    this.exifsService.getExifsOfPicture(this.id)
      .subscribe(
        exifs => this.exifs = new Exifs(
          exifs['camera_constructor'],
          exifs['camera_model'],
          exifs['lens'],
          exifs['exposure_time'],
          exifs['apperture'],
          exifs['ISO'],
          exifs['focal_length']
        ),
        err => console.log(err)
      );
  }

  getAlbumName(): void {
    if(this.albumName === '') {
      // We have already fetched the picture infos so it's safe to use them to get the album name
      this.albumService.getAlbumById(this.picture.album)
        .subscribe(album => this.albumName = album['name'])
    }
  }

}
