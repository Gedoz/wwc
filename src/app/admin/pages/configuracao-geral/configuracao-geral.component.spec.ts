import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracaoGeralComponent } from './configuracao-geral.component';

describe('ConfiguracaoGeralComponent', () => {
  let component: ConfiguracaoGeralComponent;
  let fixture: ComponentFixture<ConfiguracaoGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracaoGeralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguracaoGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
