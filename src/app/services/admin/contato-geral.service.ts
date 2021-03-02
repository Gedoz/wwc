import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContatoGeralService {

  constructor(
    private api: ApiService
  ) { }

  buscarGeral() {
    return this.api.get('/contatoGeral/buscar');
  }

  alterarGeral(contatoGeral: any) {
    return this.api.post('/contatoGeral/alterar', contatoGeral);
  }
}
