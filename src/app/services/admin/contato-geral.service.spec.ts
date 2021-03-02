import { TestBed } from '@angular/core/testing';

import { ContatoGeralService } from './contato-geral.service';

describe('ContatoGeralService', () => {
  let service: ContatoGeralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContatoGeralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
