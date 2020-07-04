import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { AlbumUUID, Album } from "../models";
import { endpoint } from "../api-config";
import { join } from "../utils";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class AlbumUuidService {

  private albums_uuidUrl = join(endpoint, 'api', 'album-uuid');

  constructor(
    private api: ApiService
  ) { }

  getUUIDFromAlbumId(id: number): Observable<AlbumUUID> {
    return this.api.get<AlbumUUID>(join(this.albums_uuidUrl, id.toString()));
  }

  getAlbumFromUUID(uuid: string): Observable<Album> {
    return this.api.get<Album>(join(this.albums_uuidUrl, uuid));
  }

}
