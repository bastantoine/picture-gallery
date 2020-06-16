import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { PictureService } from "../pictures.service";
import { ExifsService } from "../exifs.service";
import { Picture, Exifs } from "../models";

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.sass']
})
export class PictureComponent implements OnInit {

  picture: Picture;
  exifs: Exifs;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pictureService: PictureService,
    private exifsService: ExifsService
  ) { }

  ngOnInit(): void {
    this.picture = new Picture(-1, '', -1);
    let id = +this.route.snapshot.paramMap.get('id');
    this.getPicture(id);
    this.getExifs(id);
  }

  getPicture(id: number): void {
    this.pictureService.getPictureById(id)
      .subscribe(
        picture => this.picture = new Picture(
          picture['id'],
          picture['path'],
          picture['album']
        ),
        () => this.router.navigate(['/not-found'])
      );
  }

  getExifs(id: number): void {
    this.exifsService.getExifsOfPicture(id)
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

}
