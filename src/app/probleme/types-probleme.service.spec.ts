import { TestBed } from '@angular/core/testing';

import { TypesProblemeService } from './types-probleme.service';

describe('CategoryService', () => {
  let service: TypesProblemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypesProblemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
