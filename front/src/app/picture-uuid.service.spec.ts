import { TestBed } from '@angular/core/testing';

import { PictureUUIDService } from './picture-uuid.service';

describe('PictureUuidService', () => {
  let service: PictureUUIDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PictureUUIDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
