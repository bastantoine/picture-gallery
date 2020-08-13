import { TestBed } from '@angular/core/testing';

import { ExifsService } from './exifs.service';

describe('ExifsService', () => {
  let service: ExifsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExifsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
