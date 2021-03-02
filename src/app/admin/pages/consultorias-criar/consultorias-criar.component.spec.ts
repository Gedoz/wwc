import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultoriasCriarComponent } from './consultorias-criar.component';

describe('ConsultoriasCriarComponent', () => {
  let component: ConsultoriasCriarComponent;
  let fixture: ComponentFixture<ConsultoriasCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultoriasCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultoriasCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
