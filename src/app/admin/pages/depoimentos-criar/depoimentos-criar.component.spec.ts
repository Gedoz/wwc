import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepoimentosCriarComponent } from './depoimentos-criar.component';

describe('DepoimentosCriarComponent', () => {
  let component: DepoimentosCriarComponent;
  let fixture: ComponentFixture<DepoimentosCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepoimentosCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepoimentosCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
