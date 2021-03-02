import { Injectable } from '@angular/core';
import { ConfiguracaoEmail } from 'src/app/models/configuracao-email.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracaoEmailService {

  constructor(
    public api: ApiService
  ) { }

  get() {
    return this.api.get(`/configuracaoEmail/buscar`);
  }

  patch(configuracao: ConfiguracaoEmail) {
    return this.api.post(`/configuracaoEmail/alterar`, configuracao);
  }
}
