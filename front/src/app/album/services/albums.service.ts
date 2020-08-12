import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { Album } from "../../models";
import { ApiService } from "../../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  private albumUrl = 'albums';

  constructor(
    private api: ApiService) { }

  getAllAlbums(): Observable<Album[]> {
    return this.api.get<Album[]>(this.albumUrl);
  }

  getAlbumById(id: number): Observable<Album> {
    return this.api.get<Album>(this.albumUrl, id);
  }

}


