import { TestBed } from '@angular/core/testing';

import { ConfiguracaoGeralService } from './configuracao-geral.service';

describe('ConfiguracaoGeralService', () => {
  let service: ConfiguracaoGeralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiguracaoGeralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
