import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { PictureUUID, Picture } from "../models";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class PictureUUIDService {

  private picture_uuidUrl = 'picture-uuid';

  constructor(
    private api: ApiService
  ) { }

  getUUIDFromPictureId(id: number): Observable<PictureUUID> {
    return this.api.get<PictureUUID>(this.picture_uuidUrl, id);
  }

  getPictureFromUUID(uuid: string): Observable<Picture> {
    return this.api.get<Picture>([this.picture_uuidUrl, uuid]);
  }

}
