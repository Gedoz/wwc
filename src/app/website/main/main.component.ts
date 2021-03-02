import { Component, OnInit } from '@angular/core';
import { ContatoGeral } from 'src/app/models/contato-geral.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  contatoGeral: ContatoGeral = new ContatoGeral();

  constructor(
    public _data: DataService
  ) { }

  getContatoGeral() {
    this._data.getContatoGeral()
      .subscribe(res => this.contatoGeral = res);
  }

  ngOnInit() {
    this.getContatoGeral();
  }

}
