import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ContatoGeral } from 'src/app/models/contato-geral.model';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.scss']
})
export class WhatsappButtonComponent implements OnInit {

  @Input('contatoGeral') contatoGeral: ContatoGeral;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let keyPressed = event.key;
    if (keyPressed === 'Escape') {
      if (this.active) {
        this.active = false;
      }
    }
  }

  active: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  sendMessage(string: string) {
    let msg = string.replace(/ /g, "%20");
    window.open(`https://wa.me/55${this.contatoGeral.whatsApp}?text=${msg}`, '_blank');
  }

}
