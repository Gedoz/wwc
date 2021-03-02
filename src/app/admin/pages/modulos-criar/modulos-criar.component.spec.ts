import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulosCriarComponent } from './modulos-criar.component';

describe('ModulosCriarComponent', () => {
  let component: ModulosCriarComponent;
  let fixture: ComponentFixture<ModulosCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulosCriarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulosCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
