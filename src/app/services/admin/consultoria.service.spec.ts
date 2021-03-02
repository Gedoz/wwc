import { TestBed } from '@angular/core/testing';

import { ConsultoriaService } from './consultoria.service';

describe('ConsultoriaService', () => {
  let service: ConsultoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
