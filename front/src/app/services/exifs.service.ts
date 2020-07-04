import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { Exifs } from "../models";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ExifsService {

  constructor(
    private api: ApiService) { }

  getExifsOfPicture(id: number): Observable<Exifs> {
    return this.api.get<Exifs>('exifs', id);
  }
}
