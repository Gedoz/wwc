import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntasCriarComponent } from './perguntas-criar.component';

describe('PerguntasCriarComponent', () => {
  let component: PerguntasCriarComponent;
  let fixture: ComponentFixture<PerguntasCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerguntasCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerguntasCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
