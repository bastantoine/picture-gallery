import { TestBed } from '@angular/core/testing';

import { AlbumUuidService } from './album-uuid.service';

describe('AlbumUuidService', () => {
  let service: AlbumUuidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlbumUuidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
