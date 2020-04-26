import { Component, OnInit } from '@angular/core';

import { Album } from "../models";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.sass']
})
export class AlbumsComponent implements OnInit {

  albums: Album[] = [];

  constructor() { }

  ngOnInit(): void {
    let description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    for (let i = 1; i <= 30; i++) {
      this.albums.push(
        new Album(
          i, `Album ${i}`, new Date(2020, 4, 26),
          i%5 == 0 ? description : ''
        )
      )
    }
  }

}
