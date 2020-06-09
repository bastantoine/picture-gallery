import { TestBed } from '@angular/core/testing';

import { PicturesService } from './pictures.service';

describe('PictureService', () => {
  let service: PicturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PicturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
