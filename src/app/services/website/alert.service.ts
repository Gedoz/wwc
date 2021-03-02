import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  title: string = '';
  descricao: string = '';

  active: boolean = false;

  constructor() { }

  present(title: string, descricao: string) {
    this.title = title;
    this.descricao = descricao;
    this.active = true;
  }

  dismiss() {
    this.active = false;
  }
}
