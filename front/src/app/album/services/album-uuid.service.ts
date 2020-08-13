import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { AlbumUUID, Album } from "../../models";
import { ApiService } from "../../services/api.service";

@Injectable({
  providedIn: 'root'
})
export class AlbumUuidService {

  private albums_uuidUrl = 'album-uuid';

  constructor(
    private api: ApiService
  ) { }

  getUUIDFromAlbumId(id: number): Observable<AlbumUUID> {
    return this.api.get<AlbumUUID>(this.albums_uuidUrl, id);
  }

  getAlbumFromUUID(uuid: string): Observable<Album> {
    return this.api.get<Album>([this.albums_uuidUrl, uuid]);
  }

}
