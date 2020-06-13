import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { PictureService } from "../pictures.service";
import { Picture } from "../models";

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.sass']
})
export class PictureComponent implements OnInit {

  picture: Picture;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pictureService: PictureService
  ) { }

  ngOnInit(): void {
    this.picture = new Picture(0, '', 0);
    this.getPicture();
  }

  getPicture(): void {
    let id = +this.route.snapshot.paramMap.get('id');
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

}
