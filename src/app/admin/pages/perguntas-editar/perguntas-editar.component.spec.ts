import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntasEditarComponent } from './perguntas-editar.component';

describe('PerguntasEditarComponent', () => {
  let component: PerguntasEditarComponent;
  let fixture: ComponentFixture<PerguntasEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerguntasEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerguntasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
