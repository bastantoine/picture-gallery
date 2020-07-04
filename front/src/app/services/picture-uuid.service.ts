import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { PictureUUID, Picture } from "../models";
import { endpoint } from "../api-config";
import { join } from "../utils";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class PictureUUIDService {

  private picture_uuidUrl = join(endpoint, 'api', 'picture-uuid');

  constructor(
    private api: ApiService
  ) { }

  getUUIDFromPictureId(id: number): Observable<PictureUUID> {
    return this.api.get<PictureUUID>(join(this.picture_uuidUrl, id.toString()));
  }

  getPictureFromUUID(uuid: string): Observable<Picture> {
    return this.api.get<Picture>(join(this.picture_uuidUrl, uuid));
  }

}
