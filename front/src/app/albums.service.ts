import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { Album } from "./models";
import { endpoint } from "./api-config";
import { join } from "./utils";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  private albumUrl = join(endpoint, 'api', 'albums');

  constructor(
    private api: ApiService) { }

  getAllAlbums(): Observable<Album[]> {
    return this.api.get<Album[]>(this.albumUrl);
  }

  getAlbumById(id: number): Observable<Album> {
    return this.api.get<Album>(this.albumUrl, id);
  }

}


