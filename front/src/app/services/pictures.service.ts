import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { Picture } from "../models";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  constructor(private api: ApiService) { }

  getPictureById(id: number): Observable<Picture> {
    return this.api.get<Picture>('pictures', id);
  }

}
