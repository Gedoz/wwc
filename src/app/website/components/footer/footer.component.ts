import { Component, Input, OnInit } from '@angular/core';
import { ContatoGeral } from 'src/app/models/contato-geral.model';

@Component({
  selector: 'footer-website',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input('contatoGeral') contatoGeral: ContatoGeral;

  constructor() { }

  ngOnInit(): void {
  }

}
