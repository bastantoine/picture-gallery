import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { Picture } from "../models";
import { endpoint } from "../api-config";
import { join } from "../utils";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  private pictureUrl = join(endpoint, 'api', 'pictures')

  constructor(private api: ApiService) { }

  getPictureById(id: number): Observable<Picture> {
    return this.api.get<Picture>(this.pictureUrl, id);
  }

}
