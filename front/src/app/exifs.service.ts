import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

import { Exifs } from "./models";
import { endpoint } from "./api-config";
import { join } from "./utils";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ExifsService {

  private exifsUrl = join(endpoint, 'api', 'exifs');

  constructor(
    private api: ApiService) { }

  getExifsOfPicture(id: number): Observable<Exifs> {
    return this.api.get<Exifs>(this.exifsUrl, id);
  }
}
